import './App.css';
import Cookies from 'universal-cookie';
import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
//import io from "socket.io-client";
/*
const socket = io.connect("http://192.168.149.30:4040");
export const SocketContext = createContext();
*/
function App() {
  
  const [email, setEmail]=useState('');
  const weightTrash=50.0;
  const weightRecy=0.0;
  const coin=0.0;
  const cookies = new Cookies();
 // cookies.set('socket',socket,{path:'/'});
  useEffect(()=>{
    cookies.set('email', email, { path: '/' });
    cookies.set('weightTrash', weightTrash, { path: '/' });
    cookies.set('weightRecy', weightRecy, { path: '/' });
    cookies.set('coin', coin, { path: '/' });
    console.log(cookies.get('email'));
  },[email])
  
  return (
    <>
      <h1>登入頁面</h1>
      <div className="container">
        <input type="email" id="email" name="email" placeholder="請輸入電子信箱" onChange={(e)=>{setEmail(e.target.value)}}/>
        {email ==''?
          <button class="submit-button disabled">送出</button>
        :
        <Link to='/homepage'>
          <button class="submit-button enabled">送出</button>
        </Link>
        }
      </div>
    </>
  );
}

export default App;