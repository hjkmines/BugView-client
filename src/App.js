import React from 'react';
import Navbar from '../src/components/Navbar'; 
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import Home from './components/pages/Home'; 
import Profile from './components/pages/Profile'; 
import Login from './components/pages/Login'; 
import Singup from './components/pages/Singup'; 

function App() {
  return (
    <Router>
      <Navbar />
      <Route path='/'>

      </Route>  
    </Router>
  );
}

export default App;
