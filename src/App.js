import React from 'react';
import Navbar from '../src/components/Navbar'; 
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import Home from './components/pages/Home'; 
import Profile from './components/pages/Profile'; 
import Login from './components/pages/Login'; 
import Signup from './components/pages/Signup'; 
import './App.css'; 

function App() {
  return (
    <Router>
      <Navbar />
      <Route exact path='/'>
        <Home /> 
      </Route>  
      <Route path='/login'>
        <Login /> 
      </Route>
      <Route path='/profile'>
        <Profile /> 
      </Route>
      <Route path='/signup'>
        <Signup /> 
      </Route>
    </Router>
  );
}

export default App;
