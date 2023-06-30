import { Link } from 'react-router-dom';
import './homepage.css';
import Cookies from 'universal-cookie';

function homepage() {
    const cookies = new Cookies();
    return (
      <>
        <h1>智能垃圾桶</h1>
        <p>歡迎使用者:{cookies.get('email')}</p>
        <div className="button-container">
            <button onclick="window.location.href='rank.html'" class="button">排名</button>
            <Link to={'/scan'}>
                <button className="button">掃描</button>
            </Link>
            <button onclick="window.location.href='call_1.html'" class="button">呼叫</button>
        </div>
      </>
    );
  }
  
  export default homepage;