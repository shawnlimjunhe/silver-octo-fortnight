import React from 'react';
import './scrollList.css'
import ItemBox from './itemBox';

const ScrollList = ({data, onClose, isOpen}) => {

  const scrollListStyle = {
    right: isOpen ? '0' : '-100%'
  }

  const backdropStyle = {
    opacity: isOpen ? '70%' : '0%'
  }


return (
  <div style={scrollListStyle} className={`scroll-list-container`}>
    <button class='backdrop' onClick={onClose} style={backdropStyle}></button>
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