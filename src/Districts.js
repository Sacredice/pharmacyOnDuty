import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { nextShiftTimestamp, dynamicSort, getThreeClosest } from './utilityFuncitons';
import { BsArrowLeftSquareFill } from "react-icons/bs";
import Pharmacy from './Pharmacy';


function Districts({ search, setSearch, userLocation, setUserLocation }) {
  const { city } = useParams();
  const [cityObjs, setCityObjs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [searchPharmacyResults, setSearchPharmacyResults] = useState([]);
  const navigate = useNavigate();


// 2 useEffect used to prevent render component before setCityObj(arrayWithData) updated cityObjs and instead render page with
// empty array (initial value of cityObjs) render it with updated array.
  useEffect(() => {

    const handleCityPharmacies = async (city) => {
      /**
       * handleCityPharmacies funcion check nextshift timestamp is passed or not, if not use localStorage data otherwise 
       * get new data from API. And for both condition check userLocation is null or not, if not setCityObj with all data
       *  otherwise call getThreeClosest function to filter 3 closest pharmacy and use it to render list. 
       */ 
      if (((localStorage.getItem(`${city}`)) && ((JSON.parse(localStorage.getItem(`${city}`))[1]) > Date.now()))) {
        const dataArray = (JSON.parse(localStorage.getItem(`${city}`))[0]);
        console.log("userlocation", userLocation);
        if (userLocation) {
          setCityObjs(getThreeClosest(userLocation, dataArray));
          setUserLocation(null);
        } else {
          setCityObjs(dataArray);
        }  
      } else {
        setIsLoading(true);
        try {
          const response = await axios.post(`../.netlify/functions/get_pharmacies`, { city: city });
          if (response.data.success) {
            const sortedData =  response.data.result.sort(dynamicSort("dist"));
            const storageArray = [sortedData, nextShiftTimestamp()];
            localStorage.setItem(`${city}`, JSON.stringify(storageArray));
            if (userLocation) {
              setCityObjs(getThreeClosest(userLocation, sortedData));
            } else {
              setCityObjs(sortedData);
            } 
            setFetchError(null);
          }         
        } catch (err) {
          console.log(`Error: ${err.message}`);
          console.log(`Error: ${err}`);
          setFetchError(err.message);
        } finally {
          setIsLoading(false);
          setUserLocation(null);
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
    setSearch("");
    navigate("/");
  }

  return (
    <section className='districtSection'>
      {isLoading && <p className='statusMsg'><b>Liste Yükleniyor...</b></p>}
      {!isLoading && fetchError && <b className='statusMsg' style={{ color: "red"}}>{fetchError}</b>}
      {!isLoading && !fetchError && <ul className='districtList'>
        {searchPharmacyResults.map((cityObj, key) => (
          <Pharmacy cityObj={cityObj} key={key} />
        ))}
      </ul>}
      <BsArrowLeftSquareFill title='Geri Dön' className='goBackButton' onClick={handleBack} />
    </section>
  )
}

export default Districts
