import React, { useState } from "react"
import './providerOverview.css'
import ProviderDetails from "./providerDetails";

const ProviderOverview = ({title, logoUrl, providerData}) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const handleOpenDetails = () => {
    setShowDetails(true)
  }

  const handleCloseDetails = () => {
    setShowDetails(false);
  }
  
  return (
    <div>
        <div className="parent-container" onClick={handleOpenDetails}>
          <img src={logoUrl} alt='' className="logo"></img>
          <span className="title">{title}</span>
        </div>
        {showDetails && <ProviderDetails providerData={providerData} onClose={handleCloseDetails} />}

    </div>
    
  )
}

export default ProviderOverview
