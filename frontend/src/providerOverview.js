import React from "react"
import './providerOverview.css'

const ProviderOverview = ({title, logoUrl, providerData}) => {
  const handleOnClick = (providerData) => {
    console.log(providerData)
  }
  
  return (
    <div className="parent-container" onClick={() => handleOnClick(providerData)}>
      <img src={logoUrl} alt='' className="logo"></img>
      <span className="title">{title}</span>
    </div>
  )
}

export default ProviderOverview
