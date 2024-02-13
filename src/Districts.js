import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { nextShiftTimestamp, dynamicSort } from './nextShiftTimestamp';
import { BsArrowLeftSquareFill } from "react-icons/bs";
import Pharmacy from './Pharmacy';


function Districts({ search }) {
  const { city } = useParams();
  const [cityObjs, setCityObjs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchPharmacyResults, setSearchPharmacyResults] = useState([]);
  const navigate = useNavigate();


// 2 useEffect used to prevent render component before setCityObj(arrayWithData) updated cityObjs and instead render page with
// empty array (initial value of cityObjs) render it with updated array.
  useEffect(() => {

    const handleCityPharmacies = async (city) => {
      console.log(`${city}`);
      if ((localStorage.getItem(`${city}`)) && ((JSON.parse(localStorage.getItem(`${city}`))[1]) > Date.now())) {
        setCityObjs((JSON.parse(localStorage.getItem(`${city}`))[0]));
        console.log("localStore used");
        console.log("localStorage", (JSON.parse(localStorage.getItem(`${city}`))[0]));
  
  
      } else {
        setIsLoading(true);
        try {
          const response = await axios(`https://api.collectapi.com/health/dutyPharmacy?il=${city}`, {
            headers: {
              "authorization": process.env.REACT_APP_COLLECTAPI_KEY,
              "content-type": "application/json"
            }     
          });
          console.log(response.data.result);
          if (response.data.success) {
            setCityObjs(response.data.result.sort(dynamicSort("dist")));
            const storageArray = [response.data.result, nextShiftTimestamp()];
            console.log(nextShiftTimestamp(), "=> nextShiftTimestamp");
            localStorage.setItem(`${city}`, JSON.stringify(storageArray));
          }
          
        } catch (err) {
          console.log(`Error: ${err.message}`);
        } finally {
          setIsLoading(false);
        }
      }
  
    }
  
    // (async () => await handleCityPharmacies(city))();
    handleCityPharmacies(city);
  }, [city, setCityObjs, setIsLoading])
  

  useEffect(() => {

    const filteredPharmacies = cityObjs.filter((pharmacy) => 
    (((pharmacy.dist).toLowerCase()).includes(search.toLowerCase())) ||
    ((pharmacy.address).toLowerCase()).includes(search.toLowerCase())
    );
    setSearchPharmacyResults(filteredPharmacies);
    
  }, [search, cityObjs, setCityObjs, setIsLoading])
      

  const handleBack = () => {
    navigate("/");
  }

  return (
    <section className='districtSection'>
      {isLoading && <p className='statusMsg'><b>Liste Yükleniyor...</b></p>}
      {!isLoading && <ul className='districtList'>
        {searchPharmacyResults.map((cityObj, key) => (
          <Pharmacy cityObj={cityObj} key={key} />
        ))}
      </ul>}
      <BsArrowLeftSquareFill title='Geri Dön' className='goBackButton' onClick={handleBack} />
    </section>
  )
}

export default Districts
