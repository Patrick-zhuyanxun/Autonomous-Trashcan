import React from 'react';
import './rank.css'
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

function Rank() {
    const cookies = new Cookies();
    return(
    <>
        <p>歡迎使用者:{cookies.get('email')}</p>
        <div class="parent">
            <h1>回收量最多</h1>
            <Link to={'/homepage'}>
                <button>上一步</button>
            </Link>  
            <div className="child">
                <h2>No.1</h2>
            </div>
            <div className="child">
                <h2>No.2</h2>
            </div>
            <div className="child">
                <h2>No.3</h2>
            </div>
            <h1>垃圾量最少</h1>
            <div className="child">
                <h2>No.1</h2>
            </div>
            <div className="child">
                <h2>No.2</h2>
            </div>
            <div className="child">
                <h2>No.3</h2>
            </div>
        </div>
    </>
    )
  }
  
  export default Rank;
  