import { Header } from "./components/Header";
import { Search } from "./components/Search/Search";
import { Menu } from "./components/Menu";

function App() {
  return (
    <>
      <Header />
      <main>
        <section className="search-section">
          <Search />
          <Menu />
        </section>
      </main>
    </>
  );
}

export default App;
