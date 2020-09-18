import React, { Component } from 'react';

class RegistrationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
    };
  }
  updateField = e => {
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

      const data = await res.json();

      const {
        token,
        user: { id },
      } = data;

      console.log(`JWT: ${token}, User ID: ${id}`);
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
        <input type='text' name='username' placeholder='Enter Username' value={username} onChange={this.updateField}></input>
        <input type='email' name='email' placeholder='Enter Email' value={email} onChange={this.updateField}></input>
        <input type='password' name='password' placeholder='Enter Password' value={password} onChange={this.updateField}></input>
        <button type='submit'>Submit</button>
      </form>
    );
  }
}

export default RegistrationForm;
