import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import styles from "./CountryFlag.module.css";

export function CountryFlag({ country }) {
  const { name, flags, population, region, capital, cca3 } = country;

  const formatCapitals = (capital) => {
    if (!capital) return;
    return capital.length > 1 ? capital.join(", ") : capital;
  };

  return (
    <li className={styles.card}>
      <Link to={`/country/${cca3}`}>
        <figure>
          <img
            className={styles.flag}
            src={flags.svg}
            alt={flags.alt || `Flag of ${name.common}`}
          />
        </figure>
        <section className={styles.infos}>
          <h2 className={styles.title}>{name.common}</h2>
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
            {formatCapitals(capital) || "N/A"}
          </p>
        </section>
      </Link>
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
    capital: PropTypes.arrayOf(PropTypes.string),
    cca3: PropTypes.string.isRequired,
  }).isRequired,
};
