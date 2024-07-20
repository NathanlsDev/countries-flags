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
  const [selectedRegion, setSelectedRegion] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
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
      const moreCountries = filteredCountries().slice(offset, offset + limit);
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

  useEffect(() => {
    setDisplayedCountries(filteredCountries().slice(0, limit));
  }, [selectedRegion, searchQuery]);

  const filteredCountries = () => {
    return allCountries.filter((country) => {
      return (
        (selectedRegion === "" || country.region === selectedRegion) &&
        (searchQuery === "" ||
          country.name.common.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
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
