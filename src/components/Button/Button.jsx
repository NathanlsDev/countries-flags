import { useState, useEffect } from "react";

import styles from "./Button.module.css";

import lightSun from "/moon-dark.svg";
import darkMoon from "/sun-icon.svg";

export function Button() {
  const [themeIcon, setThemeIcon] = useState(lightSun);
  const [themeText, setThemeText] = useState("Dark");

  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    localStorage.setItem("selectedTheme", "dark");
    setThemeIcon(darkMoon);
    setThemeText("Light");
  };

  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    localStorage.setItem("selectedTheme", "light");
    setThemeIcon(lightSun);
    setThemeText("Dark");
  };

  useEffect(() => {
    const selectedTheme = localStorage.getItem("selectedTheme");
    if (selectedTheme === "dark") {
      setDarkMode();
    } else {
      setLightMode();
    }
  }, []);

  const toggleTheme = () => {
    const checkbox = document.querySelector(`.${styles.checkTheme}`);
    if (checkbox.checked) {
      setLightMode();
      checkbox.checked = false;
    } else {
      setDarkMode();
      checkbox.checked = true;
    }
  };

  return (
    <span className={styles.button} onClick={toggleTheme}>
      <img className={styles.themeIcon} src={themeIcon} alt="theme mode" />
      <input
        className={styles.checkTheme}
        type="checkbox"
        defaultChecked={localStorage.getItem("selectedTheme") === "dark"}
      />
      <p>{themeText} Mode</p>
    </span>
  );
}
