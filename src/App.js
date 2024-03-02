import './App.css';
import Header from './Header';
import SearchBar from './SearchBar';
import Home from './Home';
import Districts from './Districts';
import { Route, Routes } from "react-router-dom"
import { useState } from "react";


function App() {
  const [search, setSearch] = useState("");
  const [userLocation, setUserLocation] = useState(null);



  return (
    <div className="App">
      <Header title="Nöbetçi Eczaneler" />
      <SearchBar search={search} setSearch={setSearch} />
      <Routes>
        <Route path='/' element={<Home search={search} setUserLocation={setUserLocation} userLocation={userLocation} />} />
        <Route path='/districts/:city' element={<Districts search={search} userLocation={userLocation} setUserLocation={setUserLocation} />} />
      </Routes>

    </div>
  );
}

export default App;
