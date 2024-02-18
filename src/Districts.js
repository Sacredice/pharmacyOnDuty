import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { nextShiftTimestamp, dynamicSort, getThreeClosest } from './dataFuncitons';
import { BsArrowLeftSquareFill } from "react-icons/bs";
import Pharmacy from './Pharmacy';


function Districts({ search, userLocation, setUserLocation }) {
  const { city } = useParams();
  const [cityObjs, setCityObjs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchPharmacyResults, setSearchPharmacyResults] = useState([]);
  const navigate = useNavigate();



// 2 useEffect used to prevent render component before setCityObj(arrayWithData) updated cityObjs and instead render page with
// empty array (initial value of cityObjs) render it with updated array.
  useEffect(() => {

    // TODO: get rid of "|| true" bypass in first if statement
    const handleCityPharmacies = async (city) => {
      if (((localStorage.getItem(`${city}`)) && ((JSON.parse(localStorage.getItem(`${city}`))[1]) > Date.now())) || true) {
        const dataArray = (JSON.parse(localStorage.getItem(`${city}`))[0]);
        if (userLocation.length !== 0) {
          setCityObjs(getThreeClosest(userLocation, dataArray));
          setUserLocation([]);
        } else {
          setCityObjs(dataArray);
        }  
      } else {
        setIsLoading(true);
        try {
          const response = await axios.post(`./.netlify/functions/get_pharmacies`, {
            body: { city: city }
          });
          console.log(response.data.result);
          if (response.data.success) {
            const storageArray = [response.data.result, nextShiftTimestamp()];
            localStorage.setItem(`${city}`, JSON.stringify(storageArray));
            if (userLocation) {
              console.log(userLocation);
            }
            setCityObjs(response.data.result.sort(dynamicSort("dist")));

          }
          
        } catch (err) {
          console.log(`Error: ${err.message}`);
        } finally {
          setIsLoading(false);
          setUserLocation([]);
        }
      }  
    }
 
    // (async () => await handleCityPharmacies(city))();
    handleCityPharmacies(city);
  }, [city, setCityObjs, setIsLoading, setUserLocation])
  

  useEffect(() => {

    const filteredPharmacies = cityObjs.filter((pharmacy) => 
    (((pharmacy.dist).toLocaleLowerCase()).includes(search.toLocaleLowerCase())) ||
    ((pharmacy.address).toLocaleLowerCase()).includes(search.toLocaleLowerCase())
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
