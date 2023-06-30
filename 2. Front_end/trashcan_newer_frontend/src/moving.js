import './moving.css';
import React, { useState, useEffect } from 'react';
import movingGif from './assets/moving.gif';
import socket from './socket';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';

function Moving() {
  const cookies = new Cookies();
  const useraccount = cookies.get('email');
  const [showVideo, setShowVideo] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [showcancelMessage, setShowcancelMessage] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [checkable, setCheckable] = useState(1);
  
  cookies.set('checkable', checkable, { path: '/' });
  const checkstate = cookies.get('checkable');
  
  const handleButtonClick = () => {
    setCheckable(0);
    setShowcancelMessage(true);
    setShowVideo(false);
    cookies.set('checkable', 0, { path: '/' });
    socket.emit("cancel_from_user",{ 'user_id': useraccount })
  };
  
  useEffect(() => {
    socket.on("can_state_update", (state_data) => {
      if (state_data['user_id'] === cookies.get('email')) {
        if (state_data['state'] === 'opening') {
          setShowVideo(false);
          setShowMessage(true);
          setCheckable(0);
          cookies.set('checkable', 0, { path: '/' });
        }
        if (state_data['state'] === 'failed'){
          setShowVideo(false);
          setShowFailed(true);
          setCheckable(0);
          cookies.set('checkable', 0, { path: '/' });
        }
      }
    });
  }, []);

  return (
    <div className='container'>
      <div className="heading">
      <img src="/title7.png" className="title"/>
      </div>
      {showVideo && (
        <img className='gif' src={movingGif} alt="Moving GIF" />
      )}
      {showMessage && !showcancelMessage && <h1>Trashcan has arrived!</h1>}
      {showFailed && !showcancelMessage && <h1>Mission Failed</h1>}
      {showcancelMessage && !showFailed && !showMessage && <h1>Mission Canceled</h1>}
      {!showcancelMessage && !showMessage && !showFailed && <button onClick={handleButtonClick} className='buttonsubmit'>cancel</button>}
      {showcancelMessage && (<Link to={'/homepage'}>
        <button onClick={handleButtonClick} className='buttonsubmit'>home</button>
      </Link>)}
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
  );
}

export default Moving;
