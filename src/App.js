import React, { Component } from 'react';
import './App.css';

import Voter from './components/Voter';
import Admin from './components/Admin';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentVote: null,
      votingLive: false,
      loggedIn: false,
    };
  }

  renderMain() {
    const votingLive = this.state.votingLive;
      if (votingLive) {
        return <Voter vote={this.state.currentVote}/>
      }
      else return <div>NEW VOTE SOON</div>
  } 

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Horror Democracy</h1>
        </header>
        {this.renderMain()}
        <Admin/>
      </div>
    );
  }
}

export default App;
