import React from 'react'
import { IoLocationSharp } from "react-icons/io5";

function Pharmacy({ cityObj }) {

  return (
    <li className=''>
      <div className='pharmacyElement'>
        <h3 className='spaceBetween'><span>Eczane: {cityObj.name}</span><span>İlçe: {cityObj.dist}</span></h3>
        <address>{cityObj.address}</address>
        <p className='spaceBetween'>
          <a className='location' href="tel:{cityObj.phone}">Tel: {cityObj.phone}</a>
          <a className='location' href={`https://www.google.com/maps/search/?api=1&query=${cityObj.loc}`} target='_blank' rel='noreferrer'><b>Konum</b><IoLocationSharp style={{ color: "deepskyblue", fontSize: "1.3rem" }} /></a>
        </p>
      </div>
    </li>
  )
}

export default Pharmacy
