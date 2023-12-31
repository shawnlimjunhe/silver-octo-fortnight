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
  const [loadProvider, setLoadProvider] = useState(false);

  const expandedColour = '#1A2632';
  const collapseColour = '#42607B';

  const backgroundStyle = {
    background: isBoxExpanded ? expandedColour : collapseColour,
    maxHeight: isBoxExpanded ? '100px' : '30px'
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
        setLoadProvider(true)
        const providerInfo = extractedProviderData.info;  
        setLogoUrl(providerInfo['x-logo'].url);
        setProviderTitle(providerInfo.title)
      }

      setIsBoxExpanded(!isBoxExpanded)
    } catch (error) {
      console.error(error);
    }
    
  }

  return (
    <li className="item-box" key={item}>
      <div className="item-container" style={backgroundStyle}>
        <div className="item-row-background">
        <div className="item-row">
          {item}
          <FontAwesomeIcon className="drop-down" icon={isBoxExpanded ? faChevronUp : faChevronDown} size="2xs" onClick={(event) => handleChevronClick(item, event)} />
        </div>
        {loadProvider && <ProviderOverview title={providerTitle} logoUrl={logoUrl} providerData={providerData}/>}
        </div>
      </div>
    </li>
  )
}

export default ItemBox