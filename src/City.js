import React from 'react';
import { Link } from "react-router-dom";

function City({ city, setSearch }) {

  return (   
    <li className='cityElement'>
      <Link to={`/${city}`} onClick={() => setSearch("")}>
        <h1><b>{city}</b></h1>
      </Link>
    </li>
  )
}

export default City
