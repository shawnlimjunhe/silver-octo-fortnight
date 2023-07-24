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
  const [providerData, setProviderData] = useState({});

  const expandedColour = '#1A2632';
  const collapseColour = '#42607B';

  const backgroundStyle = {
    background: isBoxExpanded ? expandedColour : collapseColour
  } 

  const handleChevronClick = async (provider_name, event) => {
    event.stopPropagation();
    try {

      if (providerTitle === '') {
        console.log(`Retrieving data of ${provider_name}`)
        const response = await axios.get(`https://api.apis.guru/v2/${provider_name}.json`)
        const data = response.data.apis
        const key = Object.keys(data).find((key) => key.includes(provider_name))
        const extractedProviderData = data[key]
        setProviderData(extractedProviderData)
        const providerInfo = extractedProviderData.info;  
        setLogoUrl(providerInfo['x-logo'].url);
        setProviderTitle(providerInfo.title)
      }

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
          <FontAwesomeIcon className="drop-down" icon={isBoxExpanded ? faChevronUp : faChevronDown} size="2xs" onClick={(event) => handleChevronClick(item, event)} />
        </div>
        {isBoxExpanded && <ProviderOverview title={providerTitle} logoUrl={logoUrl} providerData={providerData}/>}
      </div>
    </li>
  )
}

export default ItemBox