/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useState } from "react";
import Icon from "@mdi/react";
import {
  mdiAccountDetails,
  mdiSchool,
  mdiBriefcaseVariant,
  mdiChevronDown,
  mdiPencil,
  mdiDelete,
  mdiEye,
  mdiEyeOff,
} from "@mdi/js";
import { PersoForm, EducForm, ExpeForm } from "./Forms";

export function InfoElem({
  elem,
  type,
  educations,
  setEducations,
  experiences,
  setExperiences,
  showNewElem,
  newID,
  setNewID,
}) {
  const [opened, setOpened] = useState(false);
  if ((!elem || !Object.keys(elem).length) && showNewElem) {
    if (type == "educ")
      return (
        <EducForm
          elem={{}}
          setOpened={setOpened}
          educations={educations}
          setEducations={setEducations}
          setNewEduc={showNewElem}
          newID={newID}
          setNewID={setNewID}
        />
      );
    else if (type == "expe")
      return (
        <ExpeForm
          elem={{}}
          setOpened={setOpened}
          experiences={experiences}
          setExperiences={setExperiences}
          setNewExpe={showNewElem}
          newID={newID}
          setNewID={setNewID}
        />
      );
    else {
      return (
        <span style={{ color: "red" }}>Something went wrong creating data</span>
      );
    }
  }
  if (opened) {
    if (type == "educ")
      return (
        <EducForm
          elem={elem}
          setOpened={setOpened}
          educations={educations}
          setEducations={setEducations}
        />
      );
    else if (type == "expe")
      return (
        <ExpeForm
          elem={elem}
          setOpened={setOpened}
          experiences={experiences}
          setExperiences={setExperiences}
        />
      );
    else {
      return (
        <span style={{ color: "red" }}>Something went wrong getting data</span>
      );
    }
  } else {
    return (
      <>
        <div className="infos-element" onClick={() => setOpened(!opened)}>
          <span>{elem.school || elem.company}</span>
          <Icon path={mdiPencil} size={0.8} />
        </div>
        <hr />
      </>
    );
  }
}

function AddInfosButton({ text, onClick }) {
  return (
    <div className="add-infos">
      <button type="button" onClick={onClick}>
        + {text}
      </button>
    </div>
  );
}

export function ContentInfos({
  educations,
  setEducations,
  experiences,
  setExperiences,
  setPersonalInfos,
  personalInfos,
}) {
  const [educExpended, setEducExpended] = useState(false);
  const [expeExpended, setExpeExpended] = useState(false);
  const [newEduc, setNewEduc] = useState(false);
  const [newExpe, setNewExpe] = useState(false);
  const [newID, setNewID] = useState(Math.random().toString(36).substring(2));
  return (
    <>
      <article className="content-infos">
        <form className="personal">
          <div className="form-title">
            <div>
              <Icon
                path={mdiAccountDetails}
                size={1}
                title="personal-details"
              />
              <h3>Personal Details</h3>
            </div>
          </div>
          <PersoForm
            setPersonalInfos={setPersonalInfos}
            personalInfos={personalInfos}
          />
        </form>

        {/* --------------- EDUCATION ---------------  */}

        <form className="education">
          <div className="form-title">
            <div>
              <Icon path={mdiSchool} size={1} title="education" />
              <h3>Education</h3>
            </div>

            <button
              type="button"
              onClick={() => setEducExpended(!educExpended)}
              className={`${educExpended ? "expended" : ""}`}
            >
              <Icon path={mdiChevronDown} size={1} title="arrow-down" />
            </button>
          </div>
          <hr></hr>
          <div className={`drop-down ${educExpended ? "active" : ""}`}>
            {educations.map((data) => (
              <InfoElem
                data-id={data.id}
                key={data.id}
                elem={data}
                type="educ"
                educations={educations}
                setEducations={setEducations}
                experiences={experiences}
                setExperiences={setExperiences}
              />
            ))}
            {newEduc && (
              <InfoElem
                key={newID}
                newID={newID}
                setNewID={setNewID}
                type="educ"
                educations={educations}
                setEducations={setEducations}
                experiences={experiences}
                setExperiences={setExperiences}
                showNewElem={setNewEduc}
              />
            )}
            {!newEduc && (
              <AddInfosButton
                text="Education"
                onClick={() => setNewEduc(true)}
              />
            )}
          </div>
        </form>

        {/* --------------- EXPERIENCE  ---------------  */}

        <form className="experience">
          <div className="form-title">
            <div>
              <Icon path={mdiBriefcaseVariant} size={1} title="experience" />
              <h3>Experience</h3>
            </div>
            <button
              type="button"
              className={`${expeExpended ? "expended" : ""}`}
              onClick={() => setExpeExpended(!expeExpended)}
            >
              <Icon path={mdiChevronDown} size={1} title="arrow-down" />
            </button>
          </div>
          <hr />
          <div className={`drop-down ${expeExpended ? "active" : ""}`}>
            {experiences.map((data) => (
              <InfoElem
                data-id={data.id}
                key={data.id}
                elem={data}
                type="expe"
                educations={educations}
                setEducations={setEducations}
                experiences={experiences}
                setExperiences={setExperiences}
              />
            ))}

            {newExpe && (
              <InfoElem
                key={newID}
                newID={newID}
                setNewID={setNewID}
                type="expe"
                educations={educations}
                setEducations={setEducations}
                experiences={experiences}
                setExperiences={setExperiences}
                showNewElem={setNewExpe}
              />
            )}
            {!newExpe && (
              <AddInfosButton
                text="Experience"
                onClick={() => setNewExpe(true)}
              />
            )}
          </div>
        </form>
      </article>
    </>
  );
}
function getContrastColor(c) {
  let r = parseInt(c.substr(1, 2), 16);
  let g = parseInt(c.substr(3, 2), 16);
  let b = parseInt(c.substr(5, 2), 16);

  let brightness = (r * 299 + g * 587 + b * 114) / 1000;
  if (brightness > 192) return "#000000";
  else if (brightness < 192 && brightness > 128) return "#333333";
  else if (brightness < 128 && brightness > 64) return "#f5f5f5";
  else return "#ffffff";
}

function useStyle() {
  const [style, setStyle] = useState({
    color: getComputedStyle(document.documentElement).getPropertyValue(
      "--accent-color"
    ),
    font: getComputedStyle(document.documentElement).getPropertyValue(
      "--font-used"
    ),
  });
  function setAccentColor(e) {
    setStyle({ ...style, color: e.currentTarget.value });
    document.documentElement.style.setProperty(
      "--accent-color",
      e.currentTarget.value
    );
    document.documentElement.style.setProperty(
      "--contrast-color",
      getContrastColor(style.color)
    );
    document.documentElement.style.setProperty(
      "--contrast-color2",
      getContrastColor(style.color) == "#ffffff"
        ? "#f5f5f5"
        : getContrastColor(style.color)
    );
  }
  function setFont(e) {
    setStyle({ ...style, font: e.currentTarget.dataset.name });
    document.documentElement.style.setProperty(
      "--font-used",
      e.currentTarget.dataset.name
    );
  }

  return [style, setAccentColor, setFont];
}

function handleFontClick(e, setFont) {
  document.querySelectorAll(".customize-info-fonts .option").forEach((e) => {
    e.children[0].style = "";
  });

  e.currentTarget.children[0].style.cssText =
    "background-color: var(--accent-color); color: var(--contrast-color)";
  setFont(e);
}
function handleLayoutClick(e) {
  const elm = e.currentTarget;
  const className = elm.children[0].className;
  const a4 = document.querySelector("#preview .a4");
  a4.classList.remove("left", "right", "top");
  a4.classList.add(className);
}
export function CustomizeInfos() {
  const [style, setColor, setFont] = useStyle();
  return (
    <>
      <article className="customize-info">
        <section className="customize-info-layout">
          <h3>Layout</h3>
          <div className="options">
            <div className="option" onClick={handleLayoutClick}>
              <div className="top">
                <div
                  style={{
                    backgroundColor: "var(--accent-color)",
                    borderBottom: "1px solid var(--contrast-color2)",
                  }}
                ></div>
                <div></div>
              </div>
              <span>Top</span>
            </div>
            <div className="option" onClick={handleLayoutClick}>
              <div className="left">
                <div
                  style={{
                    backgroundColor: "var(--accent-color)",
                    borderRight: "1px solid var(--contrast-color2)",
                  }}
                ></div>
                <div></div>
              </div>
              <span>Left</span>
            </div>
            <div className="option" onClick={handleLayoutClick}>
              <div className="right">
                <div></div>
                <div
                  style={{
                    backgroundColor: "var(--accent-color)",
                    borderLeft: "1px solid var(--contrast-color2)",
                  }}
                ></div>
              </div>
              <span>Right</span>
            </div>
          </div>
        </section>
        <section className="customize-info-colors">
          <h3>Colors</h3>
          <label>
            Accent Color
            <input type="color" value={style.color} onChange={setColor} />
          </label>
        </section>
        <section className="customize-info-fonts">
          <h3>Fonts</h3>
          <div className="options">
            <div
              style={{
                fontFamily: "serif-font",
              }}
              className="option"
              data-name="serif-font"
              onClick={(e) => handleFontClick(e, setFont)}
            >
              <div
                style={{
                  backgroundColor: "var(--accent-color)",
                  color: "var(--contrast-color)",
                }}
              >
                Aa
              </div>
              <span>Serif</span>
            </div>
            <div
              style={{ fontFamily: "sans-font" }}
              className="option"
              data-name="sans-font"
              onClick={(e) => handleFontClick(e, setFont)}
            >
              <div>Aa</div>
              <span>Sans</span>
            </div>
            <div
              style={{ fontFamily: "mono-font" }}
              className="option"
              data-name="mono-font"
              onClick={(e) => handleFontClick(e, setFont)}
            >
              <div>Aa</div>
              <span>Mono</span>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
