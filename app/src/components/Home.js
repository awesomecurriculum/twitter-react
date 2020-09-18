import React from 'react';
import UserContext from '../contexts/UserContext';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
    };
  }

  static contextType = UserContext;

  async componentDidMount() {
    console.log(this.context);
    // TODO: Fetch tweets
    const res = await fetch('/tweets', {
      method: 'get',
      headers: {
        Authorization: this.context.authToken,
      },
    });

    const { tweets } = await res.json();

    console.log(tweets || 'No tweets found!');
    this.setState({ tweets });
  }

  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <button onClick={this.context.logout}>Log out</button>
        <ul>
          {this.state.tweets.map((tweet, i) => {
            const {
              id,
              message,
              user: { username },
            } = tweet;

            return (
              <li key={id}>
                <h3>{username}</h3>
                <p>{message}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Home;
