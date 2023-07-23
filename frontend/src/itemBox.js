import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './itemBox.css'

const ItemBox = ({item}) => {

  const handleChevronClick = (item) => {
    console.log('Chevron Clicked', item);
  }

  return (
    <li key={item}>
      <div className="item-container">
        {item}
        <FontAwesomeIcon icon={faChevronDown} size="2xs" onClick={() => handleChevronClick(item)} />
      </div>
    </li>
  )
}

export default ItemBox