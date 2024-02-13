import { useEffect, useState } from 'react';
import cityList from "./citys";
import City from './City';
import { FaHome } from "react-icons/fa";

function Home({ search }) {
  const [searchCities, setSearchCities] = useState([]);

  useEffect(() => {
    const filteredList = cityList.filter(city => city.toLowerCase().includes(search.toLowerCase()));
    setSearchCities(filteredList);

  }, [search])


  return (
    <section className='citySection'>
      <ul className='cityList'>
          {searchCities.map((city, key) => (
              <City key={key} city={city} />
          ))}
      </ul>
      <div className='findButton'><FaHome style={{ marginRight: "14px" }} /><p>En Yakın 3 Eczane</p></div>
    </section>
  )
}

export default Home
