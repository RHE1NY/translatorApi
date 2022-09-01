import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import Router from './components/router/Router';
import './main.css';
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Router />
    </BrowserRouter>
  );
}

export default App;
