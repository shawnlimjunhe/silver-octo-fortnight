import React from 'react';

const ScrollList = ({data}) => {

  const handleItemClick = (item) => {
    // Implement the pop-out effect here when an item is clicked.
    console.log('Item clicked:', item);
  };

  return (
    <div>
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