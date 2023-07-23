import React from 'react';
import './scrollList.css'
import ItemBox from './itemBox';

const ScrollList = ({data, onClose}) => {




return (
  <div className={`scroll-list-container ${data.length > 0 ? 'open' : ''}`}>
    <button class='backdrop' onClick={onClose}></button>
    <div className='scroll-list'>
        <div className='scroll-list-header'>
          <p className='scroll-list-header-title'>Select Provider</p>
        </div>
        <ul>
          {data.map((item) => (
            <ItemBox item={item}></ItemBox>
          ))}
        </ul>
      </div>
  </div>
  );
};

export default ScrollList