import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./labposition.css";
import Cookies from 'universal-cookie';

function Labposition() {
  const [coords, setCoords] = useState({ x: null, y: null });
  const [carcoords, setCarcoords] = useState({ carx: null, cary: null });
  const [couldreach,setCouldreach] = useState(false);
  const mapRef = useRef(null);
  const bottomRef = useRef(null);
  const cookies = new Cookies();
  const checkstate = cookies.get('checkable');
  useEffect(() => {
    scrollToTop();
  }, []);

  const handleImageClick = (event) => {
    const mapRect = mapRef.current.getBoundingClientRect();
    const x = Math.round(event.clientX - mapRect.left);
    const y = Math.round(event.clientY - mapRect.top);
    const carx=(((164-x)/195)*4).toFixed(1);
    const cary=(((y-116)/379)*8).toFixed(1);
    setCoords({ x, y });
    setCarcoords({carx,cary});
    cookies.set('pointx', carx, { path: '/' });
    cookies.set('pointy', cary, { path: '/' });
    console.log(cookies.get('pointx'),cookies.get('pointy'));

    if (((x >= 0 && x <= 195) && (y >= 5 && y <= 75)) || ((x >= 0 && x <= 50) && (y >= 196 && y <= 283))) {
      setCouldreach(true);
    } else {
      setCouldreach(false);
    }    
    scrollToBottom();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView({behavior: "smooth" });
  };

  return (
    <>
      <div className="container">
        <div className="heading">
        <img src="/title7.png" className="title"/>
        </div>
        <div className="image-wrapper" onClick={handleImageClick}>
          <img
            src={process.env.PUBLIC_URL + "/mapfortest1.png"}
            alt="map"
            ref={mapRef}
          />
          {coords.x && coords.y && (
            <div
              className="point"
              style={{ top: coords.y, left: coords.x }}
            ></div>
          )}
        </div>
        {coords.x == null && <h1></h1>}
        {couldreach && <h1>Trashcan cannot reach this area.</h1>}
        {!couldreach && <h1>{carcoords.carx}  {carcoords.cary}</h1>}
        {coords.x == null || couldreach ? (
          <button className="button1 disabled">Next Step</button>
        ) : (
          <Link to={"/newcall"}>
            <button className="button1">Next Step</button>
          </Link>
        )}
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
          {checkstate==='0' ? 
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
          }
        </div>
        <div ref={bottomRef} />
      </div>
    </>
  );
}

export default Labposition;
