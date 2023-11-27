import { useState } from "react";

function inputValidity(elm, personalInfos, setPersonalInfos) {
  if (elm.id == "num" && elm.value.trim()) {
    if (
      !elm.value.match(
        /^[+]?[(]?[0-9]{0,3}[)]?[-\s.]?[0-9]{0,3}[-\s.]?[0-9]{6}$/
      )
    ) {
      elm.setCustomValidity("Enter a valid number!");
      setPersonalInfos({ ...personalInfos, num: "" });
    } else {
      elm.setCustomValidity("");
      setPersonalInfos({ ...personalInfos, num: elm.value });
    }
  } else if (elm.id == "email") {
    if (!elm.value.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      elm.setCustomValidity("You must enter a valid email!");
      setPersonalInfos({ ...personalInfos, email: "" });
    } else {
      elm.setCustomValidity("");
      setPersonalInfos({ ...personalInfos, email: elm.value });
    }
  } else if (elm.required && !elm.value.trim()) {
    elm.setCustomValidity("This field is required!");
    if (elm.id == "address" || elm.id == "name") {
      setPersonalInfos({ ...personalInfos, [elm.id]: "" });
    }
  } else {
    elm.setCustomValidity("");
    if (elm.id == "address" || elm.id == "name") {
      setPersonalInfos({ ...personalInfos, [elm.id]: elm.value });
    }
  }

  return elm.reportValidity();
}

function useChangeForm(init) {
  const [form, setForm] = useState(init);
  function handleInputChange(e, personalInfos, setPersonalInfos) {
    let elm = e.target;
    inputValidity(elm, personalInfos, setPersonalInfos);
    setForm({
      ...form,
      [elm.id]: elm.value.trim(),
    });
  }
  return [form, handleInputChange];
}
/* eslint-disable react/prop-types */
export function PersoForm({ personalInfos, setPersonalInfos }) {
  const [, handleInputChange] = useChangeForm({});

  return (
    <>
      <div className="la-in-gp">
        <label htmlFor="name">Full Name</label>
        <input
          onChange={(e) =>
            handleInputChange(e, personalInfos, setPersonalInfos)
          }
          id="name"
          type="text"
          maxLength="28"
          placeholder="first and last name"
          required
        />
      </div>
      <div className="la-in-gp">
        <label htmlFor="email">Email</label>
        <input
          onChange={(e) =>
            handleInputChange(e, personalInfos, setPersonalInfos)
          }
          id="email"
          type="email"
          placeholder="exp.example@gmail.vim"
          required
        />
      </div>
      <div className="la-in-gp">
        <label htmlFor="num">
          Phone Number <small>(optional)</small>
        </label>
        <input
          onChange={(e) =>
            handleInputChange(e, personalInfos, setPersonalInfos)
          }
          type="tel"
          id="num"
          placeholder="Your number"
          maxLength="20"
        />
      </div>
      <div className="la-in-gp">
        <label htmlFor="address">
          Address <small>(optional)</small>
        </label>
        <input
          onChange={(e) =>
            handleInputChange(e, personalInfos, setPersonalInfos)
          }
          id="address"
          type="text"
          placeholder="city, country"
          maxLength="80"
        />
      </div>
    </>
  );
}

export function EducForm({
  elem,
  setOpened,
  educations,
  setEducations,
  setNewEduc,
  newID,
  setNewID,
}) {
  const [form, handleInputChange] = useChangeForm({
    school: elem.school || "",
    degree: elem.degree || "",
    sdate: elem.start || "",
    edate: elem.end || "",
    educLocation: elem.location || "",
  });

  function handleDelete() {
    if (setNewEduc && !elem.school) {
      setNewEduc(false);
      return;
    }
    const newList = educations.filter((item) => item.id !== elem.id);
    setEducations(newList);
    setOpened(false);
  }
  function makeObject(obj) {
    return {
      id: elem.id || newID,
      school: obj.school,
      degree: obj.degree,
      start: obj.sdate,
      end: obj.edate,
      location: obj.educLocation,
    };
  }
  function handleCancel() {
    if (setNewEduc && !elem.school) {
      setNewEduc(false);
      return;
    }
    setOpened(false);
  }
  function handleSave() {
    const educationInputs = document.querySelectorAll(
      ".education .edit-element input"
    );
    for (let i of educationInputs) {
      if (!inputValidity(i)) return;
    }
    if (setNewEduc && !elem.school) {
      const newList = [...educations, makeObject(form)];
      setNewID(Math.random().toString(36).substring(2));
      setEducations(newList);
      setNewEduc(false);
      return;
    }
    const newList = educations.map((item) =>
      item.id === elem.id ? makeObject(form) : item
    );
    setEducations(newList);
    setOpened(false);
  }

  return (
    <>
      <div className="edit-element">
        <div className="la-in-gp">
          <label htmlFor="school">School</label>
          <input
            onChange={handleInputChange}
            id="school"
            type="text"
            maxLength="35"
            placeholder="school / university"
            defaultValue={form.school}
            required
          />
        </div>
        <div className="la-in-gp">
          <label htmlFor="degree">Degree</label>
          <input
            onChange={handleInputChange}
            id="degree"
            type="text"
            maxLength="35"
            placeholder="Degree / Field Of Study"
            defaultValue={form.degree}
            required
          />
        </div>
        <div className="la-in-gp">
          <label htmlFor="sdate">
            Start Date <small>(optional)</small>
          </label>
          <input
            onChange={handleInputChange}
            id="sdate"
            type="text"
            maxLength="15"
            placeholder="Start date"
            defaultValue={form.sdate}
          />
        </div>
        <div className="la-in-gp">
          <label htmlFor="edate">
            End Date <small>(optional)</small>
          </label>
          <input
            onChange={handleInputChange}
            id="edate"
            type="text"
            maxLength="15"
            placeholder="End date"
            defaultValue={form.edate}
          />
        </div>
        <div className="la-in-gp">
          <label htmlFor="educLocation">
            Location <small>(optional)</small>
          </label>
          <input
            onChange={handleInputChange}
            id="educLocation"
            type="text"
            maxLength="35"
            placeholder="Location / Country"
            defaultValue={form.educLocation}
          />
        </div>
        <div className="edit-element-buttons">
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
          <div>
            <button type="button" onClick={handleSave}>
              Save
            </button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
      <hr></hr>
    </>
  );
}

export function ExpeForm({
  elem,
  setOpened,
  experiences,
  setExperiences,
  setNewExpe,
  newID,
  setNewID,
}) {
  const [form, handleInputChange] = useChangeForm({
    company: elem.company || "",
    position: elem.position || "",
    sdate: elem.start || "",
    edate: elem.end || "",
    expeLocation: elem.location || "",
    description: elem.description || "",
  });

  function handleDelete() {
    if (setNewExpe && !elem.school) {
      setNewExpe(false);
      return;
    }
    const newList = experiences.filter((item) => item.id !== elem.id);
    setExperiences(newList);
    setOpened(false);
  }
  function makeObject(obj) {
    return {
      id: elem.id || newID,
      company: obj.company,
      position: obj.position,
      start: obj.sdate,
      end: obj.edate,
      location: obj.expeLocation,
      description: obj.description,
    };
  }
  function handleCancel() {
    if (setNewExpe && !elem.school) {
      setNewExpe(false);
      return;
    }
    setOpened(false);
  }
  function handleSave() {
    const experienceInputs = document.querySelectorAll(
      ".experience .edit-element input, .experience .edit-element textarea"
    );
    for (let i of experienceInputs) {
      if (!inputValidity(i)) return;
    }
    if (setNewExpe && !elem.school) {
      const newList = [...experiences, makeObject(form)];
      setNewID(Math.random().toString(36).substring(2));
      setExperiences(newList);
      setNewExpe(false);
      return;
    }
    const newList = experiences.map((item) =>
      item.id === elem.id ? makeObject(form) : item
    );
    setExperiences(newList);
    setOpened(false);
  }

  return (
    <>
      <div className="edit-element">
        <div className="la-in-gp">
          <label htmlFor="company">Company Name</label>
          <input
            onChange={handleInputChange}
            id="company"
            type="text"
            maxLength="35"
            placeholder="Company Name"
            defaultValue={form.company}
            required
          />
        </div>
        <div className="la-in-gp">
          <label htmlFor="position">Position</label>
          <input
            onChange={handleInputChange}
            id="position"
            type="text"
            maxLength="35"
            placeholder="Position title"
            defaultValue={form.position}
            required
          />
        </div>
        <div className="la-in-gp">
          <label htmlFor="sdate">
            Start Date <small>(optional)</small>
          </label>
          <input
            onChange={handleInputChange}
            id="sdate"
            type="text"
            maxLength="35"
            placeholder="Start date"
            defaultValue={form.sdate}
          />
        </div>
        <div className="la-in-gp">
          <label htmlFor="edate">
            End Date <small>(optional)</small>
          </label>
          <input
            onChange={handleInputChange}
            id="edate"
            type="text"
            maxLength="35"
            placeholder="End date"
            defaultValue={form.edate}
          />
        </div>
        <div className="la-in-gp">
          <label htmlFor="expeLocation">
            Location <small>(optional)</small>
          </label>
          <input
            onChange={handleInputChange}
            id="expeLocation"
            type="text"
            maxLength="35"
            placeholder="Location / Country"
            defaultValue={form.expeLocation}
          />
        </div>
        <div className="la-in-gp">
          <label htmlFor="description">
            Description <small>(optional)</small>
          </label>
          <textarea
            onChange={handleInputChange}
            id="description"
            type="text"
            rows="4"
            placeholder="Work description"
            defaultValue={form.description}
          ></textarea>
        </div>
        <div className="edit-element-buttons">
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
          <div>
            <button type="button" onClick={handleSave}>
              Save
            </button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}
