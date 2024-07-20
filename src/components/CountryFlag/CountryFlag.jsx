import PropTypes from "prop-types";
import styles from "./CountryFlag.module.css";

export function CountryFlag({ country }) {
  const { name, flags, population, region, capital } = country;

  return (
    <li className={styles.card}>
      <figure>
        <a href="#">
          <img className={styles.flag} src={flags.svg} alt={flags.alt} />
        </a>
      </figure>
      <section className={styles.infos}>
        <h1 className={styles.title}>
          <a href="#">{name.common}</a>
        </h1>
        <p className={styles.text}>
          <strong>Population: </strong>
          {population.toLocaleString()}
        </p>
        <p className={styles.text}>
          <strong>Region: </strong>
          {region}
        </p>
        <p className={styles.text}>
          <strong>Capital: </strong>
          {capital}
        </p>
      </section>
    </li>
  );
}

CountryFlag.propTypes = {
  country: PropTypes.shape({
    name: PropTypes.shape({
      common: PropTypes.string.isRequired,
    }).isRequired,
    flags: PropTypes.shape({
      svg: PropTypes.string.isRequired,
      alt: PropTypes.string,
    }).isRequired,
    population: PropTypes.number.isRequired,
    region: PropTypes.string.isRequired,
    capital: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
