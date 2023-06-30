import React from 'react';
import './rank.css'
import { Link } from 'react-router-dom';
import socket from './socket';
import { useState,useEffect } from 'react';
import Cookies from 'universal-cookie';



function RankTrash() {
    const cookies = new Cookies();
    const [trashlist,settrashlist]=useState(cookies.get('trashrank'));
    const [recyclelist,setrecyclelist]=useState(cookies.get('recyclerank'));
    const [trashweightlist,settrashweightlist]=useState(cookies.get('trashrank'));
    const [recycleweightlist,setrecycleweightlist]=useState(cookies.get('recyclerank'));
    const [rankrequest, setRankRequest] = useState(true);
    const checkstate = cookies.get('checkable');
    useEffect(() => {
      if (rankrequest) {
        socket.emit('rank');
        setRankRequest(false);
        console.log("1234");
      }
      socket.on("rank_update", (rank_data) => {
            cookies.set('trashrank', rank_data["trash_user"], { path: '/' });
            cookies.set('recyclerank', rank_data["recycle_user"], { path: '/' });
            cookies.set('trashrankvolume', rank_data["trash_weight"], { path: '/' });
            cookies.set('recyclerankvolume', rank_data["recycle_weight"], { path: '/' });
            settrashlist(cookies.get('trashrank'));
            setrecyclelist(cookies.get('recyclerank'));
            settrashweightlist(cookies.get('trashrankvolume'));
            setrecycleweightlist(cookies.get('recyclerankvolume'));
          });
      return () => {
        socket.off("rank_update");
      }
    }, [rankrequest]);
    
    return(
    <>
    <div className='container'>
        <div className="heading">
          <img src="/title7.png" className="title"/>
        </div>
          <rank>Rank</rank>
          <volume>Lowest Trash Volume</volume>
            <div className="child">
                <div className='rankfirst'/>
                <h2>{trashlist[0]}</h2>  
                <h2>{trashweightlist[0]} g</h2>
            </div>
            <div className="child">
                <div className='ranksecond'/>
                <h2>{trashlist[1]}</h2>  
                <h2>{trashweightlist[1]} g</h2>
            </div>
            <div className="child">
                <div className='rankthird'/>
                <h2>{trashlist[2]}</h2>  
                <h2>{trashweightlist[2]} g</h2>
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
    </>
    )
  }
  
  export default RankTrash;
  