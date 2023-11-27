import { useState, useEffect } from "react";
import Controls from "./components/Controls";
import Preview from "./components/Preview";
import Infos from "./components/Infos";
import "./App.css";
let educ1 = {
  id: Math.random().toString(36).substring(2),
  school: "Nokhbat Al Nokhab",
  degree: "IOT",
  start: "08/27/22",
  end: "this year",
  location: "Dzair dz",
};
let educ2 = {
  id: Math.random().toString(36).substring(2),
  school: "high school",
  degree: "ta9yya na9yya",
  start: "08/13/17",
  location: "Dzair dz",
};
let expe1 = {
  id: Math.random().toString(36).substring(2),
  company: "Umbrella Inc.",
  position: "Ana sass ana rass",
  start: "2024",
  end: "til death",
  location: "ghir hna",
  description:
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam distinctio cum iusto obcaecati dolores porro quis vel dolorum voluptates, eos natus! ",
};

function App() {
  const [activeNav, setActiveNav] = useState("content");
  const [lastActiveNav, setLastActiveNav] = useState("content");
  const [personalInfos, setPersonalInfos] = useState(() => {
    const savedData = localStorage.getItem("personalInfos");
    if (savedData) {
      let obj = JSON.parse(savedData);
      if (obj.name) return obj;
      else return { ...obj, name: "Your Name" };
    }
    return { name: "Your Name" };
  });
  const [experiences, setExperiences] = useState(() => {
    const savedData = localStorage.getItem("experiences");
    if (savedData) {
      return JSON.parse(savedData);
    }
    localStorage.setItem("experiences", JSON.stringify([expe1]));
    return [expe1];
  });
  const [educations, setEducations] = useState(() => {
    const savedData = localStorage.getItem("educations");
    if (savedData) {
      return JSON.parse(savedData);
    }
    localStorage.setItem("educations", JSON.stringify([educ1, educ2]));
    return [educ1, educ2];
  });
  useEffect(() => {
    localStorage.setItem("personalInfos", JSON.stringify(personalInfos));
  }, [personalInfos]);
  useEffect(() => {
    localStorage.setItem("experiences", JSON.stringify(experiences));
  }, [experiences]);
  useEffect(() => {
    localStorage.setItem("educations", JSON.stringify(educations));
  }, [educations]);

  return (
    <>
      <section className="left-root">
        <Controls
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          setLastActiveNav={setLastActiveNav}
        />
        <Infos
          activeNav={activeNav}
          lastActiveNav={lastActiveNav}
          experiences={experiences}
          setExperiences={setExperiences}
          educations={educations}
          setEducations={setEducations}
          personalInfos={personalInfos}
          setPersonalInfos={setPersonalInfos}
        />
      </section>
      <Preview
        personalInfos={personalInfos}
        experiences={experiences}
        educations={educations}
      />
    </>
  );
}

export default App;
