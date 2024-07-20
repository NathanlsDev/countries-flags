import PropTypes from "prop-types";

import styles from "./Menu.module.css";

export function Menu({ onRegionChange }) {
  const handleSelectChange = (event) => {
    onRegionChange(event.target.value);
  };

  return (
    <select className={styles.menu} onChange={handleSelectChange}>
      <option value="">Filter by Region</option>
      <option value="Africa">Africa</option>
      <option value="Americas">Americas</option>
      <option value="Asia">Asia</option>
      <option value="Europe">Europe</option>
      <option value="Oceania">Oceania</option>
    </select>
  );
}

Menu.propTypes = {
  onRegionChange: PropTypes.func.isRequired,
};
