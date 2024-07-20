import { useState, useEffect } from "react";

import { Header } from "./components/Header";
import { Search } from "./components/Search/Search";
import { Menu } from "./components/Menu/Menu";
import { CountryFlag } from "./components/CountryFlag";

import { getCountries } from "./services/api";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [displayedCountries, setDisplayedCountries] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 8;

  useEffect(() => {
    const fetchCountries = async () => {
      const countries = await getCountries();
      setAllCountries(countries);
      setDisplayedCountries(countries.slice(0, limit));
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (offset === 0) return;

    const loadMoreCountries = () => {
      const moreCountries = allCountries.slice(offset, offset + limit);
      setDisplayedCountries((prevCountries) => [
        ...prevCountries,
        ...moreCountries,
      ]);
    };

    loadMoreCountries();
  }, [offset, allCountries]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        setOffset((prevOffset) => prevOffset + limit);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (query) => {
    if (query === "") {
      setDisplayedCountries(allCountries.slice(0, offset + limit));
    } else {
      const filteredCountries = allCountries.filter((country) =>
        country.name.common.toLowerCase().includes(query.toLowerCase())
      );
      setDisplayedCountries(filteredCountries);
    }
  };

  const handleRegionChange = (region) => {
    if (region === "") {
      setDisplayedCountries(allCountries.slice(0, offset + limit));
    } else {
      const filteredCountries = allCountries.filter(
        (country) => country.region === region
      );
      setDisplayedCountries(filteredCountries);
    }
  };

  return (
    <>
      <Header />
      <main>
        <section className="search-section">
          <Search onSearch={handleSearch} />
          <Menu onRegionChange={handleRegionChange} />
        </section>
        <ul className="flags-list">
          {displayedCountries.map((country) => (
            <CountryFlag key={country.cca3} country={country} />
          ))}
        </ul>
      </main>
    </>
  );
}

export default App;
