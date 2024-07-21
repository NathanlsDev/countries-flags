import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import styles from "./CountryDetails.module.css";

export function CountryDetails({ allCountries }) {
  const { cca3 } = useParams();
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

  const getBorderCountries = (country) => {
    if (!country.borders) return "Country has no borders.";
    const countryBorders = Object.values(country.borders);
    return countryBorders;
  };

  return (
    <div className={styles.test}>
      <h1>{country.name.common}</h1>
      <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} />
      <p><strong>Native Name:</strong> {getNativeName(country)} </p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Sub Region:</strong> {country.subregion || "N/A"}</p>
      <p><strong>Capital:</strong> {country.capital || "N/A"}</p>
      <p><strong>Top Level Domain:</strong> {getTopLevelDomain(country)}</p>
      <p><strong>Currencies:</strong> {getCurrency(country)}</p>
      <p><strong>Languages:</strong> {getLanguages(country)}</p>
      <div><strong>Border Countries:</strong> {getBorderCountries(country)}</div>
    </div>
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
