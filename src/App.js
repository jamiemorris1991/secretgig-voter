import React, { Component } from 'react';
import './App.css';

import Voter from './components/Voter';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Sample</h1>
        </header>
        <Voter />
      </div>
    );
  }
}

export default App;
