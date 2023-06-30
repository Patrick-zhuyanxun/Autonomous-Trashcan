import React, { useState } from "react";
import { Link } from 'react-router-dom';

function Labposition() {
  const [coords, setCoords] = useState({ x: null, y: null });

  const handleImageClick = (event) => {
    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;
    setCoords({ x, y });
  };

  return (
    <>
        <div className="container">
            <div className="image-wrapper">
                <img src={process.env.PUBLIC_URL + '/map.jpg'} onClick={handleImageClick} />
            </div>
            <p>Click at({coords.x},{coords.y})</p>
            <Link to={'/call'}>
                <button className="button">下一步</button>
            </Link>
            <Link to={'/homepage'}>
                <button className="button2">上一步</button>
            </Link>
        </div>
        
    </>
  );
}

export default Labposition;
