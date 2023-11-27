/* eslint-disable react/prop-types */
import "./Preview.css";
import Icon from "@mdi/react";
import { mdiEmail, mdiPhone, mdiMapMarker } from "@mdi/js";
function A4Info({ type, elem }) {
  if (!elem) return;
  if (type == "educ")
    return (
      <>
        <div className="a4-info">
          <div>
            <div>
              {elem.start && <span className="sdate">{elem.start}</span>}
              {elem.end && (
                <span className="edate">
                  - <span>{elem.end}</span>
                </span>
              )}
            </div>
            {elem.location && <div className="loaction">{elem.location}</div>}
          </div>
          <div>
            <span className="school">{elem.school}</span>
            <span className="degree">{elem.degree}</span>
          </div>
        </div>
      </>
    );
  else if (type == "expe")
    return (
      <>
        <div className="a4-info">
          <div>
            <div>
              {elem.start && <span className="sdate">{elem.start}</span>}
              {elem.end && (
                <span className="edate">
                  - <span>{elem.end}</span>
                </span>
              )}
            </div>
            {elem.location && <div className="loaction">{elem.location}</div>}
          </div>
          <div>
            <span className="company">{elem.company}</span>
            <span className="position">{elem.position}</span>
            {elem.description && (
              <span className="description">{elem.description}</span>
            )}
          </div>
        </div>
      </>
    );
  else return;
}

function Preview({ personalInfos, experiences, educations }) {
  return (
    <>
      <section id="preview" className="right-root">
        <article className="a4 top">
          <header>
            {personalInfos.name && <h1>{personalInfos.name}</h1>}
            <div className="more-infos">
              {personalInfos.email && (
                <div className="personal-info">
                  <Icon path={mdiEmail} />
                  <span>{personalInfos.email}</span>
                </div>
              )}
              {personalInfos.num && (
                <div className="personal-info">
                  <Icon path={mdiPhone} />
                  <span>{personalInfos.num}</span>
                </div>
              )}
              {personalInfos.address && (
                <div className="personal-info">
                  <Icon path={mdiMapMarker} />
                  <span>{personalInfos.address}</span>
                </div>
              )}
            </div>
          </header>
          <main>
            <section className="education">
              <h3>Education</h3>
              {educations.map((data) => (
                <A4Info
                  data-id={data.id}
                  key={data.id}
                  type="educ"
                  elem={data}
                />
              ))}
            </section>
            <section className="experience">
              <h3>Experience</h3>
              {experiences.map((data) => (
                <A4Info
                  data-id={data.id}
                  key={data.id}
                  type="expe"
                  elem={data}
                />
              ))}
            </section>
          </main>
        </article>
      </section>
    </>
  );
}

export default Preview;
