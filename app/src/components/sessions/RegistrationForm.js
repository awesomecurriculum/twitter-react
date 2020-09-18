import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';

class RegistrationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
    };
  }
  update = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  registerUser = async e => {
    // Submit events automatically prompt a GET request to re-render the page
    e.preventDefault();

    const { username, email, password } = this.state;

    try {
      const res = await fetch('/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      // fetch API does not throw errors
      if (!res.ok) throw res;

      const {
        token,
        user: { id },
      } = await res.json();

      this.props.login(token, id);
    } catch (e) {
      console.error(e);
    }

    // TODO: send a POST request to create a user
  };

  render() {
    const { username, email, password } = this.state;
    return (
      <form onSubmit={this.registerUser}>
        <h2>Register</h2>
        <input type='text' name='username' placeholder='Enter Username' value={username} onChange={this.update}></input>
        <input type='email' name='email' placeholder='Enter Email' value={email} onChange={this.update}></input>
        <input type='password' name='password' placeholder='Enter Password' value={password} onChange={this.update}></input>
        <button type='submit'>Sign Up</button>
      </form>
    );
  }
}

const RegistrationFormWithContext = props => {
  return <UserContext.Consumer>{value => <RegistrationForm {...props} login={value.login} />}</UserContext.Consumer>;
};

export default RegistrationFormWithContext;
