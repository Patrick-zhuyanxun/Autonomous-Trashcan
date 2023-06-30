import './App.css';
import Cookies from 'universal-cookie';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import socket from './socket';

function App() {
  const [email, setEmail] = useState('');
  const [confirm, setConfirm] = useState(false);
  const weightTrash = 50.0;
  const weightRecy = 0.0;
  const coin = 0.0;
  const rank = [];
  const trashcancapacity = '0%';
  const cookies = new Cookies();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    cookies.set('email', email, { path: '/' });
    cookies.set('checkable', '0', { path: '/' });
    cookies.set('weightTrash', weightTrash, { path: '/' });
    cookies.set('weightRecy', weightRecy, { path: '/' });
    cookies.set('coin', coin, { path: '/' });
    cookies.set('trashrank', rank, { path: '/' });
    cookies.set('recyclerank', rank, { path: '/' });
    cookies.set('trashrankvolume', rank, { path: '/' });
    cookies.set('recyclerankvolume', rank, { path: '/' });
    cookies.set('trashcan1trashcapacity', trashcancapacity, { path: '/' });
    cookies.set('trashcan2trashcapacity', trashcancapacity, { path: '/' });
    cookies.set('trashcan1recycapacity', trashcancapacity, { path: '/' });
    cookies.set('trashcan2recycapacity', trashcancapacity, { path: '/' });
    cookies.set('clickable', 1, { path: '/' });
    console.log(cookies);
  }, [email]);

  const handleButtonClick = () => {
    socket.emit("login", { 'user_id': email });
  };

  socket.on("update", (update_data) => {
    if (update_data['user_id'] === cookies.get('email')) {
      setConfirm(true);
    }
  });

  useEffect(() => {
    socket.on("can_state_update", (state_data) => {
      if (state_data['state'] === 'stop') {
        cookies.set('clickable', 1, { path: '/' });
        console.log("OK");
      } else {
        cookies.set('clickable', 0, { path: '/' });
        console.log('Cannot');
      }
    });
  }, []);

  useEffect(() => {
    if (confirm) {
      navigate('/homepage');
    }
  }, [confirm, navigate]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const source = urlParams.get('source');

    if (source === 'qrcode') {
      if (confirm){
        navigate('/trashcan1');
    }}
  }, [confirm,location.search, navigate]);

  return (
    <>
      <div className="container">
        <div className="heading">
          <img src="/title7.png" className="title" />
        </div>
        <h1>Login</h1>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Please enter your school number"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        {email === '' ? (
          <button className="submit-button disabled">Login</button>
        ) : (
          <button onClick={handleButtonClick} className="submit-button enabled">Login</button>
        )}
      </div>
    </>
  );
}

export default App;
