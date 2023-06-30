import { Link } from 'react-router-dom';
import './homepage.css';
import Cookies from 'universal-cookie';
import socket from './socket';
import { useEffect, useState } from 'react';

let first=true;


function Homepage() {
  const cookies = new Cookies();
  const useraccount = cookies.get('email');
  const checkstate = cookies.get('checkable');
  const [trash,settrash]=useState(cookies.get('weightTrash'));
  const [recycle,setrecycle]=useState(cookies.get('weightRecy'));
  const [totalcoin,settotalcoin]=useState(cookies.get('coin'));
  const [trash1capacity,settrash1capacity]=useState(cookies.get('trashcan1trashcapacity'));
  const [trash2capacity,settrash2capacity]=useState(cookies.get('trashcan2trashcapacity'));
  const [rec1capacity,setrec1capacity]=useState(cookies.get('trashcan1recycapacity'));
  const [rec2capacity,setrec2capacity]=useState(cookies.get('trashcan2recycapacity'));
  
  if (first){
    socket.emit("login", { 'user_id': useraccount });
  }
  socket.on("update", (update_data) => {
    if (update_data['user_id'] === cookies.get('email')) {
      cookies.set('weightTrash',update_data['weight_trash'], { path: '/' });
      cookies.set('weightRecy',update_data['weight_recy'], { path: '/' });
      cookies.set('coin',update_data['coin'],{path:'/'});
      cookies.set('trashcan1trashcapacity',update_data['can_cap']['1']['cap_trash'],{path:'/'});
      cookies.set('trashcan2trashcapacity',update_data['can_cap']['2']['cap_trash'],{path:'/'});
      cookies.set('trashcan1recycapacity',update_data['can_cap']['1']['cap_recy'],{path:'/'});
      cookies.set('trashcan2recycapacity',update_data['can_cap']['2']['cap_recy'],{path:'/'});
      settrash(cookies.get('weightTrash'));
      setrecycle(cookies.get('weightRecy'));
      settotalcoin(cookies.get('coin'));
      settrash1capacity(cookies.get('trashcan1trashcapacity'));
      setrec1capacity(cookies.get('trashcan1recycapacity'));
      settrash2capacity(cookies.get('trashcan2trashcapacity'));
      setrec2capacity(cookies.get('trashcan2recycapacity'));
      first=false;
    }}
  );
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
  return (
  <>
    <div className='container'>
      <div className="heading">
          <img src="/title7.png" className="title"/>
      </div>
      <div className="rectangle-lay">
        <div className="text-group">
          <textinhomepageleft>Welcome User</textinhomepageleft>
          <textinhomepageuserid>{cookies.get('email')}</textinhomepageuserid>
        </div>
        <div className='text-group'>
          <textinhomepageright>$ {totalcoin}</textinhomepageright>
        </div>
      </div>
      <div className='logo-container'>
        <Link to={'/ranktrash'}>
          <button className="button-homepage-rank">
            <div className='icon-container'>
              <div className='logo1'/>
              <textinhomepageranknumber>{trash}</textinhomepageranknumber>
              <textinhomepagerank>g</textinhomepagerank>
            </div>
          </button>
        </Link>
        <Link to={'/rankrecycle'}>
          <button className="button-homepage-rank">
            <div className='icon-container'>
              <div className='logo2'/>
              <textinhomepageranknumber>{recycle}</textinhomepageranknumber>
              <textinhomepagerank>g</textinhomepagerank>
            </div>
          </button>
        </Link>
      </div>
      <div className='slider'>
        <div className='slider-content'>
          <textinhomepagetitle>Living Room</textinhomepagetitle>
          <div className='capacity-container'>
            <div className='icon-container'>
              <div className='logo6'/>
              <textinhomepagecapacity>{trash1capacity}</textinhomepagecapacity>
            </div>
            <div className='icon-container'>
              <div className='logo7'/>
              <textinhomepagecapacity>{rec1capacity}</textinhomepagecapacity>
            </div>
          </div>
        </div>
        <div className='slider-content'>
          <textinhomepagetitle>Kitchen</textinhomepagetitle>
          <div className='capacity-container'>
            <div className='icon-container'>
              <div className='logo6'/>
              <textinhomepagecapacity>{trash2capacity}</textinhomepagecapacity>
            </div>
            <div className='icon-container'>
              <div className='logo8'/>
              <textinhomepagecapacity>{rec2capacity}</textinhomepagecapacity>
            </div>
          </div>
        </div>
        <div className='slider-content'>
          <div className='logo9'/>
        </div>
      </div>
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
          <button className="button-homepage-use">
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

export default Homepage;
