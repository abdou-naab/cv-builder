import PropTypes from "prop-types";
import "./Controls.css";
import Icon from "@mdi/react";
import {
  mdiFileDocumentOutline,
  mdiPaletteOutline,
  mdiFileDownloadOutline,
} from "@mdi/js";

function Controls({ activeNav, setActiveNav, setLastActiveNav }) {
  const controls_list = [
    { name: "content", icon: mdiFileDocumentOutline },
    { name: "customize", icon: mdiPaletteOutline },
    { name: "download", icon: mdiFileDownloadOutline },
  ];

  const handleActiveNav = (navName) => {
    setActiveNav(navName);
    if (navName != "download") {
      setLastActiveNav(navName);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      let element = document.querySelector("#preview .a4");

      var opt = {
        filename: "cv.pdf",
      };
      // eslint-disable-next-line no-undef
      html2pdf().set(opt).from(element).save();
    }
  };
  return (
    <>
      <section id="controls">
        <nav>
          {controls_list.map((control) => (
            <button
              key={control.name}
              className={`control-nav-item ${
                activeNav == control.name && "active-control-nav-item"
              }`}
              onClick={() => handleActiveNav(control.name)}
            >
              <Icon path={control.icon} title={control.name} />
              <span>
                {control.name.charAt(0).toUpperCase() + control.name.slice(1)}
              </span>
            </button>
          ))}
        </nav>
      </section>
    </>
  );
}
Controls.propTypes = {
  activeNav: PropTypes.string.isRequired,
  setActiveNav: PropTypes.func.isRequired,
  setLastActiveNav: PropTypes.func.isRequired,
};
export default Controls;
