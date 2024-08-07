import imgHolder from "/placeholderImg.svg";
import styles from "./Placeholder.module.css";

export function Placeholder() {
  return (
    <li className={styles.container}>
      <figure>
        <img className={styles.image} src={imgHolder} alt="gray image template" />
      </figure>
      <section className={styles.section}>
        <div className={styles.div}></div>
        <div className={styles.div}></div>
        <div className={styles.div}></div>
      </section>
    </li>
  );
}
