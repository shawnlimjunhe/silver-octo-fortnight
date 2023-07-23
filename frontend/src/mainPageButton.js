import React from 'react';
import './mainPageButton.css'

function MainPageButton(props) {
  return (
    <button className='button' onClick={props.onClick}>
      {props.label}
    </button>
  );
}

export default MainPageButton;
