import React from 'react';
import { Link } from "react-router-dom";

function City({ city }) {

  return (   
    <li className='cityElement'>
      <Link to={`/districts/${city}`}>
        <h1><b>{city}</b></h1>
      </Link>
    </li>
  )
}

export default City
