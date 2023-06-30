import React, { useState, useRef } from 'react';
import QrReader from 'react-qr-scanner';

function Scan() {
  const [result, setResult] = useState('');
  const qrRef = useRef(null);

  const handleScan = (data) => {
    if (data) {
      setResult(data);
      qrRef.current.stop();
      window.open(data, '_blank'); // 在新分頁開啟掃描結果
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
        ref={qrRef}
      />
      <p>{result}</p>
    </>
  );
}

export default Scan;
