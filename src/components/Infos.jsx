/* eslint-disable react/prop-types */
import { CustomizeInfos, ContentInfos } from "./InfoElement";

import "./Infos.css";

function Infos({
  activeNav,
  lastActiveNav,
  educations,
  setEducations,
  experiences,
  setExperiences,
  setPersonalInfos,
  personalInfos,
}) {
  const infos = {
    content: (
      <ContentInfos
        experiences={experiences}
        setExperiences={setExperiences}
        educations={educations}
        setEducations={setEducations}
        setPersonalInfos={setPersonalInfos}
        personalInfos={personalInfos}
      />
    ),
    customize: <CustomizeInfos />,
  };
  return (
    <>
      <section id="infos">
        {activeNav != "download" ? infos[activeNav] : infos[lastActiveNav]}
      </section>
    </>
  );
}

export default Infos;
