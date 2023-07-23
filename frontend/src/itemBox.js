import React, { useState } from "react"
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './itemBox.css'
import ProviderOverview from "./providerOverview";

const ItemBox = ({item}) => {

  const [isBoxExpanded, setIsBoxExpanded] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');
  const [providerTitle, setProviderTitle] = useState('')

  const expandedColour = '#1A2632';
  const collapseColour = '#42607B';

  const backgroundStyle = {
    background: isBoxExpanded ? expandedColour : collapseColour
  } 

  const handleChevronClick = async (provider_name) => {
    try {
      const response = await axios.get(`https://api.apis.guru/v2/${provider_name}.json`)
      const data = response.data.apis
      const key = Object.keys(data).find((key) => key.includes(provider_name))
      const providerData = data[key]

      const providerInfo = providerData.info;

      setLogoUrl(providerInfo['x-logo'].url);
      setProviderTitle(providerInfo.title)

      console.log(providerData);
      setIsBoxExpanded(!isBoxExpanded)
      console.log('Chevron Clicked', provider_name);
    } catch (error) {
      console.error(error);
    }
    
  }

  return (
    <li className="item-box" key={item}>
      <div className="item-container" style={backgroundStyle}>
        <div className="item-row">
          {item}
          <FontAwesomeIcon icon={isBoxExpanded ? faChevronUp : faChevronDown} size="2xs" onClick={() => handleChevronClick(item)} />
        </div>
        {isBoxExpanded && <ProviderOverview title={providerTitle} logoUrl={logoUrl}/>}
      </div>
    </li>
  )
}

export default ItemBox