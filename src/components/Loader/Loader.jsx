import styles from "./Loader.module.css";

export function Loader() {
  return (
    <div className={styles.container} data-id="loader">
      <div className={styles.loader}></div>
    </div>
  );
}
