import styles from "./CountryFlag.module.css";

export function CountryFlag() {
  return (
    <li className={styles.card}>
      <figure>
        <a href="#">
          <img
            className={styles.flag}
            src="../../../docs/design/desktop-design-detail-dark.jpg"
            alt="test image"
          />
        </a>
      </figure>
      <section className={styles.infos}>
        <h1 className={styles.title}>
          <a href="#">Germany</a>
        </h1>
        <p className={styles.text}>
          <strong>Population: </strong>81.770,900
        </p>
        <p className={styles.text}>
          <strong>Region: </strong>Europe
        </p>
        <p className={styles.text}>
          <strong>Capital: </strong>Berlin
        </p>
      </section>
    </li>
  );
}
