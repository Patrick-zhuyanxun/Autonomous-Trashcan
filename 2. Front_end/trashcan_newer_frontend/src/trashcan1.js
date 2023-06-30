import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import socket from './socket';

function Trashcan1() {
  const cookies = new Cookies();
  const [countdown, setCountdown] = useState(3); // 倒數計時初始值為 3 秒

  const useraccount = cookies.get('email');
  socket.emit('open_from_user', { 'user_id': useraccount, 'can_id': 1 });
  console.log("send");

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = '/homepage';
    }, 3000);

    // 更新倒數計時並減少1秒
    const countdownTimer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // 在清除計時器時同時清除倒數計時器
    return () => {
      clearTimeout(timer);
      clearInterval(countdownTimer);
    };
  }, []);

  return (
    <>
    <div className='container'>
        <div className="heading">
        <img src="/title7.png" className="title"/>
          </div>
        </div>
        <div className='container-main'>
          <h1>trashcan1 will open</h1>
          <h1>Redirecting to homepage in {countdown} seconds</h1>
        </div>
    </>
  );
}

export default Trashcan1;
//for testing
