import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import { Header } from "./components/Header";
import { Search } from "./components/Search/Search";
import { Menu } from "./components/Menu/Menu";
import { CountryFlag } from "./components/CountryFlag";
import { CountryDetails } from "./components/CountryDetails";
import { Loader } from "./components/Loader";

import { getCountries } from "./services/api";

function CountryFlagsApp() {
  const [allCountries, setAllCountries] = useState([]);
  const [displayedCountries, setDisplayedCountries] = useState([]);
  const [offset, setOffset] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchSection, setShowSearchSection] = useState(true);

  const limit = 8;
  const pathLocation = useLocation();

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

  useEffect(() => {
    return pathLocation.pathname !== "/"
      ? setShowSearchSection(false)
      : setShowSearchSection(true);
  }, [pathLocation]);

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
        {showSearchSection && (
          <section className="search-section">
            <Search onSearch={handleSearch} />
            <Menu onRegionChange={handleRegionChange} />
          </section>
        )}
        <Routes>
          <Route
            path="/"
            element={
              <ul className="flags-list">
                {displayedCountries.map((country) => (
                  <CountryFlag key={country.cca3} country={country} />
                ))}
              </ul>
            }
          />
          <Route
            path="/country/:cca3"
            element={<CountryDetails allCountries={allCountries} />}
          />
        </Routes>
        <Loader />
      </main>
    </>
  );
}

function App() {
  return (
    <Router>
      <CountryFlagsApp />
    </Router>
  );
}

export default App;
