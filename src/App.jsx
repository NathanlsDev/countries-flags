import { Header } from "./components/Header";
import { Search } from "./components/Search/Search";
import { Menu } from "./components/Menu";
import { CountryFlag } from "./components/CountryFlag";

function App() {
  return (
    <>
      <Header />
      <main>
        <section className="search-section">
          <Search />
          <Menu />
        </section>
        <ul className="flags-list">
          <CountryFlag />
        </ul>
      </main>
    </>
  );
}

export default App;
