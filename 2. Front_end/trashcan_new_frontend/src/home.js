import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import App from './App.js';
import Homepage from "./homepage.js";
import Scan from "./scan.js"
import Call from "./call.js"
import Rank from "./rank.js"
import Trashcan1 from "./trashcan1.js"
import Trashcan2 from "./trashcan2.js"
import Socket from "./socket.js"
import Labposition from "./labposition.js"
const AppRouter = () => (
  <Router>
    
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path="/homepage/" element={<Homepage/>} />
      <Route path="/scan/" element={<Scan/>} />
      <Route path="/call/" element={<Call/>} />
      <Route path="/labposition/" element={<Labposition/>} />
      <Route path="/rank/" element={<Rank/>} />
      <Route path="/trashcan1/" element={<Trashcan1/>} />
      <Route path="/trashcan2/" element={<Trashcan2/>} />
      <Route path="/socket/" element={<Socket/>} />
    </Routes>  
    
  </Router>
);

export default AppRouter;