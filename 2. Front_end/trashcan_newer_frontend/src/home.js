import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import App from './App.js';
import Homepage from "./homepage.js";
import Scan from "./scan.js";
import NewCall from "./newcall.js";
import RankTrash from "./ranktrash.js";
import RankRecycle from "./rankrecycle.js";
import Trashcan1 from "./trashcan1.js";
import Trashcan2 from "./trashcan2.js";
import Socket from "./socket.js";
import Labposition from "./labposition.js";
import Moving from "./moving.js";
import Opentrashcan from "./opentrashcan.js";

const AppRouter = () => (
  <Router>
    
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path="/homepage/" element={<Homepage/>} />
      <Route path="/scan/" element={<Scan/>} />
      <Route path="/newcall/" element={<NewCall/>} />
      <Route path="/labposition/" element={<Labposition/>} />
      <Route path="/ranktrash/" element={<RankTrash/>} />
      <Route path="/rankrecycle/" element={<RankRecycle/>} />
      <Route path="/trashcan1/" element={<Trashcan1/>} />
      <Route path="/trashcan2/" element={<Trashcan2/>} />
      <Route path="/socket/" element={<Socket/>} />
      <Route path="/moving/" element={<Moving/>} />
      <Route path="/opentrashcan/" element={<Opentrashcan/>} />
    </Routes>  
    
  </Router>
);

export default AppRouter;