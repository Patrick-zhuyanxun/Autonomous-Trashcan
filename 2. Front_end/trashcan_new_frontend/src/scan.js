import React, { useState } from 'react';
import QrReader from 'modern-react-qr-reader';
import './scan.css';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

function Scan() {
  const [result, setResult] = useState('');
  const [hasOpened, setHasOpened] = useState(false); // 新增 hasOpened state

  const handleScan = (data) => {
    if (data && !hasOpened) { // 檢查 hasOpened 是否為 false
      setResult(data);
      const newWindow = window.open(data, '_blank');
      if (newWindow) {
        newWindow.focus();
        setHasOpened(true); // 更新 hasOpened state
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className="parent">
      <Link to={'/homepage'}>
        <button className="childbutton">上一步</button>
      </Link>
      <div className="scanner-container">
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '60vw', height: '60vh' }}
        />
        <p>{result}</p>
      </div>
    </div>
  );
}

export default Scan;
