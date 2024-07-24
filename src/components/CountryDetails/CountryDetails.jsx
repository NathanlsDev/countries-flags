import { useParams, Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import styles from "./CountryDetails.module.css";

export function CountryDetails({ allCountries }) {
  const { cca3 } = useParams();
  const navigate = useNavigate();
  const country = allCountries.find((country) => country.cca3 === cca3);

  if (!country) {
    return <div>Country not found</div>;
  }

  const getNativeName = (country) => {
    if (!country.name.nativeName) return country.name.common;
    const nativeNames = Object.values(country.name.nativeName);
    return nativeNames[0].common;
  };

  const getCurrency = (country) => {
    if (!country.currencies) return "N/A";
    const currencies = Object.values(country.currencies);
    return currencies[0].name;
  };

  const getTopLevelDomain = (country) => {
    if (!country.tld) return "N/A";
    const topLevelDomain = Object.values(country.tld);
    return topLevelDomain[0];
  };

  const getLanguages = (country) => {
    if (!country.languages) return "N/A";
    const mainLanguages = Object.values(country.languages);
    return mainLanguages.slice(0, 3).join(", ");
  };

  const formatCapitals = (country) => {
    if (!country.capital) return;
    return country.capital.length > 1
      ? country.capital.join(", ")
      : country.capital;
  };

  const getBorderCountries = (country) => {
    if (!country.borders) return "Has no border countries.";

    return country.borders.map((borderCca3) => {
      const borderCountry = allCountries.find(
        (country) => country.cca3 === borderCca3
      );

      return (
        <li key={borderCca3} className={styles.countryNav}>
          <Link to={`/country/${borderCca3}`}>{borderCountry.name.common}</Link>
        </li>
      );
    });
  };

  return (
    <article className={styles.country}>
      <Link className={styles.backLink} to="#" onClick={() => navigate(-1)}>
        <svg
          className={styles.mySvg}
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="geometricPrecision"
          textRendering="geometricPrecision"
          imageRendering="optimizeQuality"
          fillRule="evenodd"
          clipRule="evenodd"
          viewBox="0 0 512 243.58"
        >
          <path
            fill="currentColor"
            fillRule="nonzero"
            d="M138.43 243.58 0 122.84 140.47 0l20.92 23.91-94.92 83 445.53-.42v31.75l-445.54.41 92.89 81.02z"
          />
        </svg>
        Back
      </Link>
      <section className={styles.countryMolding}>
        <figure className={styles.flagMolding}>
          <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} />
        </figure>
        <div className={styles.divisorLayer1}>
          <div className={styles.divisorLayer2}>
            <h2 className={styles.countryName}>{country.name.common}</h2>
            <div className={styles.divisorLayer3}>
              <div className={styles.countryInfos}>
                <p><strong>Native Name:</strong> {getNativeName(country)}</p>
                <p><strong>Population:</strong>{" "}{country.population.toLocaleString()}
                </p>
                <p><strong>Region:</strong> {country.region}</p>
                <p><strong>Sub Region:</strong> {country.subregion || "N/A"}</p>
                <p><strong>Capital:</strong> {formatCapitals(country) || "N/A"}</p>
              </div>
              <div className={styles.countryInfos}>
                <p><strong>Top Level Domain:</strong>{" "}{getTopLevelDomain(country)}</p>
                <p><strong>Currencies:</strong> {getCurrency(country)}</p>
                <p><strong>Languages:</strong> {getLanguages(country)}</p>
              </div>
            </div>
          </div>
          <div className={styles.countryBorders}>
            <strong>Border Countries:</strong>
            <ul className={styles.borderList}>{getBorderCountries(country)}</ul>
          </div>
        </div>
      </section>
    </article>
  );
}

CountryDetails.propTypes = {
  allCountries: PropTypes.arrayOf(
    PropTypes.shape({
      cca3: PropTypes.string.isRequired,
      name: PropTypes.shape({
        common: PropTypes.string.isRequired,
        nativeName: PropTypes.object,
      }).isRequired,
      flags: PropTypes.shape({
        svg: PropTypes.string.isRequired,
      }).isRequired,
      population: PropTypes.number.isRequired,
      region: PropTypes.string.isRequired,
      subregion: PropTypes.string,
      capital: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
      ]),
      tld: PropTypes.arrayOf(PropTypes.string),
      currencies: PropTypes.object,
      languages: PropTypes.object,
      borders: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
};
