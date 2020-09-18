import React from 'react';
import UserContext from '../../contexts/UserContext';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    // TODO: Set up default state
    this.state = {
      email: '',
      password: '',
    };
  }

  update = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  loginUser = async e => {
    e.preventDefault();

    const { email, password } = this.state;

    try {
      const res = await fetch('/users/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw res;

      const {
        token,
        user: { id },
      } = await res.json();

      this.props.login(token, id);
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <form onSubmit={this.loginUser}>
        <h2>Log In</h2>
        <input type='email' placeholder='Password...' value={this.state.email} name='email' onChange={this.update}></input>
        <input type='password' placeholder='Password...' value={this.state.password} name='password' onChange={this.update}></input>
        <button type='submit'>Submit</button>
      </form>
    );
  }
}

const LoginFormWithContext = props => <UserContext.Consumer>{value => <LoginForm {...props} login={value.login} />}</UserContext.Consumer>;

export default LoginFormWithContext;
