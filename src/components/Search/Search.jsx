import PropTypes from "prop-types";

import styles from "./Search.module.css";

export function Search({ onSearch }) {
  const handleSearchInput = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className={styles.element}>
      <span className={styles.icon}>🔍</span>
      <input
        className={styles.searchbar}
        type="text"
        placeholder="Search for a country..."
        onChange={handleSearchInput}
      />
    </div>
  );
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
