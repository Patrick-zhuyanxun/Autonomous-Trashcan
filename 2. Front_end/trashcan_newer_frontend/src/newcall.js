import React, { useState } from 'react';
import './newcall.css';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import socket from './socket';

function NewCall() {
  const cookies = new Cookies();
  const useraccount = cookies.get('email');
  const pointx = cookies.get('pointx');
  const pointy = cookies.get('pointy');
  const checkstate = cookies.get('checkable');
  //const pointx='0.0';
  //const pointy='0.0';
  const [trash, settrash] = useState({
    garbage: false,
    bottle: false,
    paper: false,
  });
  const [isDisabled, setIsDisabled] = useState(true);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    settrash({ ...trash, [name]: checked });
  };

  const handleButtonClick = () => {
    const selectedOptions = Object.entries(trash)
      .filter(([key, value]) => value)
      .map(([key, value]) => ({ label: key }));
  
    const formattedData = {
      'trash': false,
      'plastic': false,
      'paper': false,
    };
  
    selectedOptions.forEach((option) => {
      if (option.label === 'garbage') {
        formattedData['trash'] = true;
      } else if (option.label === 'bottle') {
        formattedData['plastic'] = true;
      } else if (option.label === 'paper') {
        formattedData['paper'] = true;
      }
    });
  
    // 傳送資料到 server
    socket.emit('call_from_user', {
      'user_id': useraccount,
      'position': [parseFloat(pointx), parseFloat(pointy)],
      'type': formattedData,
    });
    console.log(formattedData);
  };
  

  // 檢查至少一個勾選
  const isAtLeastOneChecked = Object.values(trash).some((value) => value === true);
  // 如果至少一個勾選就解除按鈕禁用
  if (isAtLeastOneChecked && isDisabled) {
    setIsDisabled(false);
  }
  // 如果沒有任何勾選就禁用按鈕
  if (!isAtLeastOneChecked && !isDisabled) {
    setIsDisabled(true);
  }

  return (
    <>
    <div className='container'>
        <div className="heading">
        <img src="/title7.png" className="title"/>
        </div>
      <div className="checkbox-group">
        <div className="checkbox-option">
          <input
            type="checkbox"
            id="garbage"
            name="garbage"
            checked={trash.garbage}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="garbage">Trash</label>
        </div>
        <div className="checkbox-option">
          <input
            type="checkbox"
            id="bottle"
            name="bottle"
            checked={trash.bottle}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="bottle">Plastic</label>
        </div>
        <div className="checkbox-option">
          <input
            type="checkbox"
            id="paper"
            name="paper"
            checked={trash.paper}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="paper">Paper</label>
        </div>
      </div>
      <div className='call-button-container'>
        <Link to={'/labposition'}>
        <button className='buttonsubmit'>
          Previous
        </button>
        </Link>
        <Link to={'/moving'}>
        <button onClick={handleButtonClick} disabled={isDisabled} className='buttonsubmit'>
          Submit
        </button>
        </Link>
      </div>
      <div className="button-container">
          <Link to={'/opentrashcan'}>
            <button className="button-homepage">
              <div className='icon-container'>
                <div className='logo3'/>
                <textinhomepage>Open</textinhomepage>
              </div>
            </button>
          </Link>
          <Link to={'/homepage'}>
            <button className="button-homepage">
              <div className='icon-container'>
                <div className='logo4'/>
                <textinhomepage>Home</textinhomepage>
              </div>
            </button>
          </Link>
          {/* {checkstate==='0' ? 
            <Link to={'/labposition'}>
              <button className="button-homepage-use">
                <div className='icon-container'>
                  <div className='logo5'/>
                  <textinhomepage>Call</textinhomepage>
                </div>
              </button>
            </Link>
            : 
            <Link to={'/moving'}>
              <button className="button-homepage-use">
                <div className='icon-container'>
                  <div className='logo5'/>
                  <textinhomepage>Call</textinhomepage>
                </div>
              </button>
            </Link>
          } */}
          {<Link to={'/labposition'}>
            <button className="button-homepage-use">
              <div className='icon-container'>
                <div className='logo5'/>
                <textinhomepage>Call</textinhomepage>
              </div>
            </button>
          </Link>}
        </div>
    </div>
    </>
  );
}

export default NewCall;
