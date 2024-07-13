import styles from "./Search.module.css";

export function Search() {
  return (
    <input
      className={styles.searchbar}
      type="text"
      placeholder="Search for a country..."
    />
  );
}
