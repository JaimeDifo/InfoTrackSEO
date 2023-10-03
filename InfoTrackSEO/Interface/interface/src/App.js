import './Components/App.css';
import AddSEO from './AddSEO.js';
import Search from './Search';
import History from "./History";
import Edit from "./Edit";
import Image from './SEOBanner.png'; 
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App container">
          <h3 className="main-title">
            InfoTrack <img src={Image} alt="InfoTrackSEO Logo" className="smaller-image" />
          </h3>
          <nav className='navbar navbar-expand-sm bg-light navbar-dark'> 
            <ul className="navbar-nav">
              <li className="nav-item m-1">
                <NavLink to="/AddSEO">
                  <button className="button-1">Add SEO</button> 
                </NavLink>
                <NavLink to="/Search">
                   <button className="button-2">Search</button>
                </NavLink>
                <NavLink to="/History">
                  <button className="button-3">History</button>
                </NavLink>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/AddSEO" element={<AddSEO />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/History" element={<History />} />
            <Route path="/Edit/:id" element={<Edit />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
