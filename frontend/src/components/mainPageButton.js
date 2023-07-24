import React , {useState} from 'react';
import axios from 'axios';
import './mainPageButton.css'
import ScrollList from './scrollList';

function MainPageButton(props) {
  const [scrollListExists, setScrollListExist] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);
  const [listData, setListData] = useState([]);

  const handleClick = async (event) => {
    event.stopPropagation();

    try {
      if (listData.length === 0) {
        const response = await axios.get('https://api.apis.guru/v2/providers.json');
        const dataArray = Object.values(response.data.data);
        setListData(dataArray);
      }
      
      setScrollListExist(true);
      setTimeout(() => {
        setIsListOpen(true)
      }, 10)

    } catch (error) {
      console.error(error)
    }
    
  };

  const handleListClose = () => {
    setIsListOpen(false);
  };

  return (
    <div>
        <button className='button' onClick={(event) => handleClick(event)}>
          {props.label}
        </button>
        {scrollListExists && <ScrollList data = {listData} onClose={handleListClose} isOpen={isListOpen}></ScrollList>}
    </div>
    
  );
}

export default MainPageButton;
