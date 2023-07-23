import React from 'react';
import './scrollList.css'

const ScrollList = ({data, onClose}) => {

  const handleItemClick = (item) => {
    console.log('Item clicked:', item);
  };

return (
  <div className={`scroll-list-container ${data.length > 0 ? 'open' : ''}`}>
    <button class='backdrop' onClick={onClose}></button>
    <div className='scroll-list'>
        <div className='scroll-list-header'>
          <p className='scroll-list-header-title'>Select Provider</p>
        </div>
        <ul>
          {data.map((item) => (
            <li key={item} onClick={() => handleItemClick(item)}>
              {item}
            </li>
          ))}
        </ul>
      </div>
  </div>
  );
};

export default ScrollList