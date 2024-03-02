import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import cityList from "./citys";
import City from './City';
import { FaHome } from "react-icons/fa";
import { BsFillInfoSquareFill } from "react-icons/bs";
import InfoModal from './InfoModal';

function Home({ search, setUserLocation }) {
  const [searchCities, setSearchCities] = useState([]);
  const [infoModal, setInfoModal] = useState(false);
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
        // TODO: delete coordinates accuracy bypass and comment out if else
        const response = await axios(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        const province = response.data.address.province;
        setUserLocation({ ...coordinates, city: province });
        navigate(`/districts/${province}`);
        // if (coordinates.accuracy < 750) {
        //   setUserLocation({ ...coordinates, city: province });
        //   navigate(`/districts/${province}`);
        // } else {
        //   alert("UYARI: Cihazın konum hassasiyeti yeterli olmadığından şehrin listesine yönlendiriliyorsunuz!");
        //   setUserLocation([]);
        //   navigate(`/districts/${province}`);
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
      <BsFillInfoSquareFill title='info' className='infoButton' onClick={() => setInfoModal(!infoModal)} />
      {infoModal && <InfoModal setInfoModal={setInfoModal} />}
    </section>
    
  )
}

export default Home
