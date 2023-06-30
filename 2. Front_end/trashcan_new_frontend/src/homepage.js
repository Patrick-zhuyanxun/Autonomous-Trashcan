import { Link } from 'react-router-dom';
import './homepage.css';
import Cookies from 'universal-cookie';
//import { SocketContext } from "./App";
import socket from './socket';
import { useState } from 'react';
// import { useState } from 'react';
//import io from "socket.io-client";
//var socket = io.connect("http://192.168.149.30:4040");

let first=true;


function Homepage() {
  const cookies = new Cookies();
  const useraccount = cookies.get('email');
  const [trash,settrash]=useState(cookies.get('weightTrash'));
  const [recycle,setrecycle]=useState(cookies.get('weightRecy'));
  const [totalcoin,settotalcoin]=useState(cookies.get('coin'));
  if (first){
  socket.emit("login", { 'user_id': useraccount });
  console.log('456');
  
  }
  socket.on("update", (update_data) => {
    console.log(update_data);
    if (update_data['user_id'] === cookies.get('email')) {
      cookies.set('weightTrash',update_data['weight_trash'], { path: '/' });
      cookies.set('weightRecy',update_data['weight_recy'], { path: '/' });
      cookies.set('coin',update_data['coin'],{path:'/'});
      settrash(cookies.get('weightTrash'));
      setrecycle(cookies.get('weightRecy'));
      settotalcoin(cookies.get('coin'));
      first=false;
    }}
  );
  return (
    <>
      <h1>智能垃圾桶</h1>
      <p>歡迎使用者:{cookies.get('email')}</p>
      <div className='container'>
        <div className="button-container">
          <Link to={'/rank'}>
            <button className="button">排名</button>
          </Link>
          <Link to={'/scan'}>
            <button className="button">掃描</button>
          </Link>
          <Link to={'/labposition'}>
            <button className="button">呼叫</button>
          </Link>
        </div>
        <p>累積垃圾量:{trash}kg 累積回收量:{recycle}kg</p>
        <div className="circle-container">
          <div className="circle">
            <p>北科寶特幣:</p>
            <p>{totalcoin}元</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
