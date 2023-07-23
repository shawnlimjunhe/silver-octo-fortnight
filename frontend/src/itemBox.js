import React, { useState } from "react"
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './itemBox.css'

const ItemBox = ({item}) => {

  const [isBoxExpanded, setIsBoxExpanded] = useState(false);

  const handleChevronClick = async (provider_name) => {
    try {
      const response = await axios.get(`https://api.apis.guru/v2/${provider_name}.json`)
      console.log(response);
      setIsBoxExpanded(!isBoxExpanded)
      console.log('Chevron Clicked', provider_name);
    } catch (error) {
      console.error(error);
    }
    
  }

  return (
    <li className="item-box" key={item}>
      <div className="item-container">
        {item}
        <FontAwesomeIcon icon={isBoxExpanded ? faChevronUp : faChevronDown} size="2xs" onClick={() => handleChevronClick(item)} />
      </div>
    </li>
  )
}

export default ItemBox