import React, { useEffect, createContext, useReducer } from 'react';
import Navbar from '../src/components/Navbar'; 
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'; 
import Home from './components/pages/Home'; 
import Profile from './components/pages/Profile'; 
import Login from './components/pages/Login'; 
import Signup from './components/pages/Signup'; 
import CreatePost from './components/pages/CreatePost'; 
import { reducer, initialState} from './reducers/userReducer'; 
import './App.css'; 

const UserContext = createContext()

const Routing = () => {
  const history = useHistory(); 

  return (
    <Switch>
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
      <Route path='/createpost'>
        <CreatePost /> 
      </Route>
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState); 

  return (
    <UserContext.Provider value={{ state, dispatch }}>
    <Router>
      <Navbar />
      <Routing /> 
    </Router>
    </UserContext.Provider>
  );
}

export default App;
