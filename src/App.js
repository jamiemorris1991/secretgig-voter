import React, { Component } from 'react';

import './App.css';

import Vote from './components/Voter';
import Admin from './components/Admin';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Horror Democracy</h1>
        </header>
        <Vote />
        <Admin/>
      </div>
    );
  }
}

export default App;
