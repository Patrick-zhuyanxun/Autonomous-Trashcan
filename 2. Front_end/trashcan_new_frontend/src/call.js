import React, { useState } from 'react';
import './call.css';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import socket from './socket';

function CheckboxList() {
  const cookies = new Cookies();
  const useraccount = cookies.get('email');
  const [options, setOptions] = useState([
    { id: 1, label: '一般垃圾', checked: false },
    { id: 2, label: '寶特瓶回收', checked: false },
    { id: 3, label: '紙類回收', checked: false }
  ]);

  const handleCheckboxChange = (optionId) => {
    const updatedOptions = options.map(option => {
      if (option.id === optionId) {
        return { ...option, checked: !option.checked };
      } else {
        return option;
      }
    });
    setOptions(updatedOptions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedOptions = options.filter(option => option.checked);
    console.log('Selected options:', selectedOptions);
    const formattedData = {
          'trash': false,
          'plastic': false,
          'paper': false
      };
  
      selectedOptions.forEach(option => {
        if (option.label === '一般垃圾') {
          formattedData['trash'] = true;
        } else if (option.label === '寶特瓶回收') {
          formattedData['plastic'] = true;
        } else if (option.label === '紙類回收') {
          formattedData['paper'] = true;
        }
      });
  
      // 傳送資料到 server
      socket.emit('call_from_user', {
        'user_id': useraccount, 
        'position': [15.5, 15.5], 
        'type':formattedData
        });
  };

  const isSubmitDisabled = options.every(option => !option.checked);

  return (
    <>
    <p>歡迎使用者:{cookies.get('email')}</p>
    
    <form onSubmit={handleSubmit}>
      <div className="checkbox-list">
        {options.map(option => (
          <label key={option.id} className="checkbox-option">
            <input type="checkbox" value={option.id} checked={option.checked} onChange={() => handleCheckboxChange(option.id)} />
            {option.label}
          </label>
        ))}
      </div>
      <Link to={'/labposition'}>
        <button className="button2">上一步</button>
      </Link>
      <button  className="button1" type="submit" disabled={isSubmitDisabled}>Submit</button>
    </form>
    </>
  );
}

export default CheckboxList;
