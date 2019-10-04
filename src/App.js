import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css';
import Dashboard from './Screens/Dashboard'
import Login from './Screens/Login'
import Logout from './Screens/Logout'
import Register from './Screens/Register'

function App() {
  return (
    <>
      <Router>
        <Route path="/" exact component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/register" component={Register} />
        <Route path="/logout" component={Logout} />
      </Router>
    </>
  );
}

export default App;
