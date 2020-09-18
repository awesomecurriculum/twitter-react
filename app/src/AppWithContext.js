import React, { Component } from 'react';
import Cookies from 'js-cookie';
import UserContext from './contexts/UserContext';
import App from './App';

class AppWithContext extends Component {
  constructor() {
    super();

    let authToken = Cookies.get('token'); // get the cookie with the name of 'token'
    let currentUserId = null;
    if (authToken) {
      try {
        const payload = authToken.split('.')[1]; // payload of a JWT is after the first period in the token string
        const decodedPayload = atob(payload); // payload needs to be decoded using the built-in function `atob`
        const payloadObj = JSON.parse(decodedPayload); // convert the decoded payload into a POJO from a JSON string
        const {
          data: { id },
        } = payloadObj;
        /* payloadObj will look like:
    payloadObj = {
      data: { id: ..., email: ... }
    }
    */
        currentUserId = id; // set currentUserId equal to the payload's user id
      } catch (e) {
        // if there is an error parsing the token, then remove the 'token' cookie
        authToken = null;
        Cookies.remove('token');
      }
    }
    this.state = {
      authToken: authToken || null,
      currentUserId: currentUserId,
      updateContext: this.updateContext,
    };
  }

  updateContext = (authToken, currentUserId) => {
    this.setState({ authToken, currentUserId }, () => {
      console.log(this.state);
    });
  };

  render() {
    return (
      <UserContext.Provider value={this.state}>
        <App />
      </UserContext.Provider>
    );
  }
}

export default AppWithContext;
