import React from 'react';
import './scrollList.css'

const ScrollList = ({data, onClose}) => {

  const handleItemClick = (item) => {
    // Implement the pop-out effect here when an item is clicked.
    console.log('Item clicked:', item);
  };

return (
    <div className={`scroll-list ${data.length > 0 ? 'open' : ''}`}>
      <button onClick={onClose}>Close</button>
      <div className='scroll-list-header'>
        <p>Select Provider</p>
      </div>
      <ul>
        {data.map((item) => (
          <li key={item} onClick={() => handleItemClick(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScrollList