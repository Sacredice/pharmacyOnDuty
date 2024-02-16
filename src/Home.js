import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import cityList from "./citys";
import City from './City';
import { FaHome } from "react-icons/fa";

function Home({ search, setUserLocation }) {
  const [searchCities, setSearchCities] = useState([]);
  const navigate = useNavigate();
  


  useEffect(() => {
    const filteredList = cityList.filter(city => city.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
    setSearchCities(filteredList);

  }, [search])

  const findUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {

      const coordinates = {
        accuracy: position.coords.accuracy,
        lat: position.coords.latitude,
        lon: position.coords.longitude
      };
      getCityFromCoords(coordinates);
    },
    err => console.log(err));

    const getCityFromCoords = async (coordinates) => {
      const lat = coordinates.lat;
      const lon = coordinates.lon;
      try {
        const response = await axios(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        setUserLocation({ ...coordinates, city: response.data.address.province });
        navigate(`/districts/${response.data.address.province}`);
        // if (coordinates.accuracy < 750) {
        //   setUserLocation({ ...coordinates, city: response.data.address.province });
        //   navigate(`/districts/${response.data.address.province}`);
        // } else {
        //   alert("UYARI: Cihazın konum hassasiyeti yeterli olmadığından şehrin listesine yönlendiriliyorsunuz!");
        //   setUserLocation([]);
        //   navigate(`/districts/${response.data.address.province}`);
        // }  
      } catch (err) {
        console.log(`Error: ${err.message}`);
      }
    }

  }

  return (
    <section className='citySection'>
      <ul className='cityList'>
          {searchCities.map((city, key) => (
              <City key={key} city={city} />
          ))}
      </ul>
      <div className='findButton' onClick={findUserLocation}><FaHome style={{ marginRight: "14px" }} /><p>En Yakın 3 Eczane</p>
      </div>
    </section>
  )
}

export default Home
