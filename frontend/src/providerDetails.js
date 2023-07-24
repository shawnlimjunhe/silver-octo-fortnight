import React from "react";
import './providerDetails.css'

const ProviderDetails = ({providerData, onClose}) => {

  console.log('in details', providerData)
  const {
    info,
    swaggerUrl: providerSwaggerAPI
  } = providerData

  const logoUrl = info['x-logo'].url

  const {
    description: providerDescription,
    title,
    contact,
  } = info

  const providerEmail = contact && contact.email ? contact.email : 'No Email Found';
  const providerName = contact && contact.name ? contact.name : "No Name Found"
  const providerUrl = contact && contact.url ? contact.url : "No Url Found"


  return (
    <div className="provider-details-screen">
      <div className="header">
      <img src={logoUrl} alt="" className="logo"></img>
      <span className="title">{title}</span>
    </div>
    <div className="body">
      <div className="info-container">
        <div className="info-header">Description</div>
        <div>{providerDescription}</div>
      </div>
      <div className="info-container-spacer"/>
      <div className="info-container">
        <div className="info-header">Swagger</div>
        <div>{providerSwaggerAPI}</div>
      </div>
      <div className="info-container-spacer"/>
      <div className="contact-container">
        <div className="info-header">Contact</div>
        <div className="contact-info">
          <span className="contact-label">Email</span>
          <span>{providerEmail}</span>
        </div>
        <div className="contact-info">
          <span className="contact-label">Name</span>
          <span>{providerName}</span>
        </div>
        <div className="contact-info">
          <span className="contact-label">Url</span>
          <span>{providerUrl}</span>
        </div>
      </div>
    </div>
    <div className="button-container">
      <button className='button' onClick={onClose}>
          Explore more APIs
        </button>
    </div>
      
    </div>
    
  )
}

export default ProviderDetails
