import React from "react"
import './providerOverview.css'

const ProviderOverview = ({title, logoUrl}) => {
  return (
    <div className="parent-container">
      <img src={logoUrl} alt='' className="logo"></img>
      <span className="title">{title}</span>
    </div>
  )
}

export default ProviderOverview
