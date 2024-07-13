import styles from "./Header.module.css";
// import { Button } from "../Button";

export function Header() {
  return (
    <header className={styles.header}>
      <section className={styles.content}>
        <h1>Where in the world?</h1>
        {/* <Button /> */}
      </section>
    </header>
  );
}
