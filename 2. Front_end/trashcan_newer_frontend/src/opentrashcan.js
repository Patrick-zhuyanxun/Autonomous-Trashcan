import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import socket from './socket';

function Open() {
  const cookies = new Cookies();
  const checkstate = cookies.get('checkable');
  const useraccount = cookies.get('email');
  const [showenable, setShowenable] = useState(cookies.get('clickable'));
  useEffect(()=>{
    socket.on("can_state_update", (state_data) => {
        if (state_data['state'] === 'stop') {
          cookies.set('clickable', 1, { path: '/' });
          console.log("OK");
        }
        else{
          cookies.set('clickable', 0, { path: '/' });
          console.log('Cannot');
        }
      })
    },[]);
  useEffect(() => {
    const interval = setInterval(() => {
      setShowenable(cookies.get('clickable'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const trashcan1ButtonClick = () => {
    if (showenable !== '0') {
      socket.emit('open_from_user', { 'user_id': useraccount, 'can_id': 1 });
    }
  };

  const trashcan2ButtonClick = () => {
      socket.emit('open_from_user', { 'user_id': useraccount, 'can_id': 2 });
  };

  return (
    <>
      <div className='container'>
        <div className="heading">
          <img src="/title7.png" className="title" />
        </div>
        <div className={`logo-container `}>
          <button
            className={`button-homepage-rank ${showenable === '0' ? 'disabled' : ''}`}
            onClick={trashcan1ButtonClick}
            disabled={showenable === '0'}
            style={{ opacity: showenable === '0' ? 0.6 : 1 }}
          >
            <div className='icon-container'>
              <div className='logo10' />
              <textinhomepageranknumber>Trashcan</textinhomepageranknumber>
              <textinhomepagerank>Living Room</textinhomepagerank>
            </div>
          </button>
          <button
            className="button-homepage-rank"
            onClick={trashcan2ButtonClick}
            //disabled={showenable === '0'}
            //style={{ opacity: showenable === '0' ? 0.6 : 1 }}
          >
            <div className='icon-container'>
              <div className='logo11' />
              <textinhomepageranknumber>Trashcan</textinhomepageranknumber>
              <textinhomepagerank>Kitchen</textinhomepagerank>
            </div>
          </button>
        </div>
        <div className="button-container">
          <Link to={'/opentrashcan'}>
            <button className="button-homepage-use">
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
        </div>
      </div>
    </>
  );
}

export default Open;
