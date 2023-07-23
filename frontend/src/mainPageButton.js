import React from 'react';
import axios from 'axios';
import './mainPageButton.css'

function MainPageButton(props) {
  const handleClick = async () => {
    try {
      const response = await axios.get('https://api.apis.guru/v2/providers.json');
      alert('Button clicked!');
      console.log(response.data);
    } catch (error) {
      console.error(error)
    }
    
  };

  return (
    <button className='button' onClick={handleClick}>
      {props.label}
    </button>
  );
}

export default MainPageButton;
