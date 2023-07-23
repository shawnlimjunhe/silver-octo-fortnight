import React , {useState} from 'react';
import axios from 'axios';
import './mainPageButton.css'
import ScrollList from './scrollList';

function MainPageButton(props) {
  const [listData, setListData] = useState([]);

  const handleClick = async () => {
    try {
      const response = await axios.get('https://api.apis.guru/v2/providers.json');
      alert('Button clicked!');

      const dataArray = Object.values(response.data.data);
      setListData(dataArray);

    } catch (error) {
      console.error(error)
    }
    
  };

  return (
    <div>
        <button className='button' onClick={handleClick}>
          {props.label}
        </button>
        <ScrollList data = {listData}></ScrollList>
    </div>
    
  );
}

export default MainPageButton;
