import styles from "./Search.module.css";

export function Search() {
  return (
    <div className={styles.element}>
      <span className={styles.icon}>🔍</span>
      <input
        className={styles.searchbar}
        type="text"
        placeholder="Search for a country..."
      />
    </div>
  );
}
