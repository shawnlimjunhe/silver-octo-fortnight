import React , {useState} from 'react';
import axios from 'axios';
import './mainPageButton.css'
import ScrollList from './scrollList';

function MainPageButton(props) {
  const [isListOpen, setIsListOpen] = useState(false);
  const [listData, setListData] = useState([]);

  const handleClick = async () => {
    try {
      const response = await axios.get('https://api.apis.guru/v2/providers.json');
      const dataArray = Object.values(response.data.data);
      setListData(dataArray);
      setIsListOpen(true);

    } catch (error) {
      console.error(error)
    }
    
  };

  const handleListClose = () => {
    setIsListOpen(false);
  };

  return (
    <div>
        <button className='button' onClick={handleClick}>
          {props.label}
        </button>
        {isListOpen && <ScrollList data = {listData} onClose={handleListClose}></ScrollList>}
    </div>
    
  );
}

export default MainPageButton;
