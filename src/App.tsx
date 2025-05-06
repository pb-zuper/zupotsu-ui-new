import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainPage } from './Container/MainPage';
import Popup from './Atoms/popup/popup';
import mixpanel from 'mixpanel-browser';

// mixpanel.init("9511b04c53b0658b1a50a2ef34658ec8", {
//     debug: true, 
//     api_host: "https://api.mixpanel.com",
// });


function App() {
  return (
    <div className="App">
      <Router>
        <MainPage />
      </Router>
    </div >
  );
}

export default App;
