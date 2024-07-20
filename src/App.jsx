import { useState, useEffect } from "react";

import { Header } from "./components/Header";
import { Search } from "./components/Search/Search";
import { Menu } from "./components/Menu";
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

  return (
    <>
      <Header />
      <main>
        <section className="search-section">
          <Search />
          <Menu />
        </section>
        <ul className="flags-list">
          {displayedCountries.map((country, id) => (
            <CountryFlag key={country.cca3 + id} country={country} />
          ))}
        </ul>
      </main>
    </>
  );
}

export default App;
