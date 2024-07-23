import styles from "./Header.module.css";
import { Button } from "../Button";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className={styles.header}>
      <section className={styles.content}>
        <h1 className={styles.title}>
          <Link to="/">Where in the world?</Link>
        </h1>
        <Button />
      </section>
    </header>
  );
}
