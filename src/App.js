import './App.css';
import Header from './Header';
import SearchBar from './SearchBar';
import Home from './Home';
import Districts from './Districts';
import { Route, Routes } from "react-router-dom"
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");


  return (
    <div className="App">
      <Header title="Nöbetçi Eczaneler" />
      <SearchBar search={search} setSearch={setSearch} />
      <Routes>
        <Route path='/' element={<Home search={search} />} />
        <Route path='/districts/:city' element={<Districts search={search} />} />
      </Routes>

    </div>
  );
}

export default App;
