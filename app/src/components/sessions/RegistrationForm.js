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

  registerUser() {}
  render() {
    const { username, email, password } = this.state;
    return (
      <form onSubmit={this.registerUser}>
        <h2>Register</h2>
        <input type='text' name='username' placeholder='Enter Username' value={username} onChange={this.updateField}></input>
        <input type='email' name='email' placeholder='Enter Email' value={email} onChange={this.updateField}></input>
        <input type='password' name='password' placeholder='Enter Password' value={password} onChange={this.updateField}></input>
      </form>
    );
  }
}

export default RegistrationForm;
