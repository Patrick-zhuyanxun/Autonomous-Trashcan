import React, { useState } from 'react';
import QrReader from 'modern-react-qr-reader';
import './scan.css';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

function Scan() {
  const cookies = new Cookies();
  const [result, setResult] = useState('');
  const checkstate = cookies.get('checkable');
  const handleScan = (data) => {
    if (data) {
      setResult(data);
      window.location.href = data; // 在現有頁面中開啟掃描到的頁面
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <>
      <div className='container'>
        <div className="heading">
        <img src="/title7.png" className="title"/>
        </div>
        <div className="parentqrcode">
          <div className="qrcode-container">
            <QrReader
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: '80vw', height: '80vw' }}
            />
          </div>
        </div>
        <div className="button-container">
          <Link to={'/scan'}>
            <button className="button-homepage-use">
              <div className='icon-container'>
                <div className='logo3'/>
                <textinhomepage>Scan</textinhomepage>
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
          {checkstate==='0' ? 
            <Link to={'/labposition'}>
              <button className="button-homepage">
                <div className='icon-container'>
                  <div className='logo5'/>
                  <textinhomepage>Call</textinhomepage>
                </div>
              </button>
            </Link>
            : 
            <Link to={'/moving'}>
              <button className="button-homepage">
                <div className='icon-container'>
                  <div className='logo5'/>
                  <textinhomepage>Call</textinhomepage>
                </div>
              </button>
            </Link>
          }
          {/* <Link to={'/labposition'}>
            <button className="button-homepage">
              <div className='icon-container'>
                <div className='logo5'/>
                <textinhomepage>Call</textinhomepage>
              </div>
            </button>
          </Link> */}
        </div>
      </div>
    </>
  );
}

export default Scan;
//need SSL
//cannot use now