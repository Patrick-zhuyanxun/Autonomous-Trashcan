import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import App from './App.js';
import Homepage from "./homepage.js";
import Scan from "./scan.js"
import Call from "./call.js"
import Rank from "./rank.js"

const AppRouter = () => (
  <Router>
    
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path="/homepage/" element={<Homepage/>} />
      <Route path="/scan/" element={<Scan/>} />
      <Route path="/call/" element={<Call/>} />
      <Route path="/rank/" element={<Rank/>} />
    </Routes>  
    
  </Router>
);

export default AppRouter;