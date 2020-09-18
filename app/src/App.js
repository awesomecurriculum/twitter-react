import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import RegistrationForm from './components/sessions/RegistrationForm';
import LoginForm from './components/sessions/LoginForm';
import { ProtectedRoute, AuthRoute } from './Routes';

function App({ currentUserId }) {
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
        <AuthRoute path='/register' component={RegistrationForm} currentUserId={currentUserId} />
        <AuthRoute path='/login' component={LoginForm} currentUserId={currentUserId} />
        <ProtectedRoute path='/users/:userId' component={Profile} currentUserId={currentUserId} />
        <ProtectedRoute exact path='/' component={Home} currentUserId={currentUserId} />
      </Switch>
    </div>
  );
}

export default App;
