import './App.css';
import Cookies from 'universal-cookie';
import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';

function App() {
  const [email, setEmail]=useState('');
  const cookies = new Cookies();
  useEffect(()=>{
    cookies.set('email', email, { path: '/' });
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
          <button class="submit-button enabled" >送出</button>
        </Link>
        }
      </div>
    </>
  );
}

export default App;
