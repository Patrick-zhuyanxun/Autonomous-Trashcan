import React from 'react';
//import io from 'socket.io-client';
import Cookies from 'universal-cookie';
//import { SocketContext } from "./App";
import socket from './socket';

function App() {
  const cookies = new Cookies();
  
  const useraccount=cookies.get('email');
  socket.emit('open_from_user', {'user_id': useraccount, 'can_id': 1});
  console.log("send")
  return (
    <div>
      <h1>Hello {cookies.get('email')}</h1>
    </div>
  );
}

export default App;
