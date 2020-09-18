import React from 'react';
import RegistrationForm from './components/sessions/RegistrationForm';
import { Switch, Route, NavLink } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import LoginForm from './components/sessions/LoginForm';
import { ProtectedRoute, AuthRoute } from './Routes';

function App() {
  return (
    <div>
      <h1>Twitter Lite</h1>
      <nav>
        <NavLink to='/register'>Register</NavLink>
        <br></br>
        <NavLink to='/login'>Login</NavLink>
        <br></br>
        <NavLink exact to='/home'>
          Home
        </NavLink>
      </nav>

      <Switch>
        <AuthRoute path='/register' component={RegistrationForm}></AuthRoute>
        <AuthRoute path='/login' component={LoginForm}></AuthRoute>
        <ProtectedRoute path='/users/:userId' component={Profile}></ProtectedRoute>
        <ProtectedRoute exact path='/' component={Home}></ProtectedRoute>
      </Switch>
    </div>
  );
}

export default App;
