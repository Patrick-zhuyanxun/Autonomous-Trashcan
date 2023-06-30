import React from 'react';
//import io from 'socket.io-client';
import Cookies from 'universal-cookie';
//import { SocketContext } from "./App";
import socket from './socket';

function App() {
  const cookies = new Cookies();
  //var socket = io.connect('http://192.168.149.30:4040');
  const useraccount=cookies.get('email');
  socket.emit('open_from_user', {'user_id': useraccount, 'can_id': 2});
   // 建立 Socket.IO 連線
   // 傳送使用者 ID 給 server
  //console.log("send")
  return (
    <div>
      <h1>Hello {cookies.get('email')}</h1>
    </div>
  );
}

export default App;
