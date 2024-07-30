import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

import { Header } from "./components/Header";
import { Search } from "./components/Search/Search";
import { Menu } from "./components/Menu/Menu";
import { CountryFlag } from "./components/CountryFlag";
import { CountryDetails } from "./components/CountryDetails";
import { Loader } from "./components/Loader";

import { getCountries } from "./services/api";

function CountryFlagsApp() {
  const [allCountries, setAllCountries] = useState([]);
  const [offset, setOffset] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchSection, setShowSearchSection] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  const limit = 8;
  const pathLocation = useLocation();

  const filteredCountries = () => {
    return allCountries.filter((country) => {
      return (
        (selectedRegion === "" || country.region === selectedRegion) &&
        (searchQuery === "" ||
          country.name.common.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
  };

  const displayedCountries = filteredCountries().slice(0, offset + limit);

  useEffect(() => {
    getCountries()
      .then((countries) => { setAllCountries(countries)})
      .catch((error) => console.log("Error message:", error));
    // .finally(() => {});
  }, []);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setTimeout(() => {
          setOffset((prevOffset) => prevOffset + limit);
        }, "500");
      }
    });

    const loaderElement = document.querySelector("[data-id='loader']");

    if (loaderElement) {
      intersectionObserver.observe(loaderElement);
    }
    return () => intersectionObserver.disconnect();
  }, []);

  useEffect(() => {
    return pathLocation.pathname !== "/"
      ? setShowSearchSection(false)
      : setShowSearchSection(true);
  }, [pathLocation]);

  useEffect(() => {
    return pathLocation.pathname !== "/"
      ? setShowLoader(false)
      : setShowLoader(true);
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
        {showLoader && <Loader />}
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
