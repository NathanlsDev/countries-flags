import { Header } from "./components/Header";
import { Search } from "./components/Search/Search";

function App() {
  return (
    <>
      <Header />
      <main>
        <section>
          <Search />
          {/* <Menu /> */}
        </section>
      </main>
    </>
  );
}

export default App;
