import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import './App.css';

import Vote from './components/Voter';
import Admin from './components/Admin';
import Winner from './components/Winner';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Horror Democracy</h1>
          <Winner />
        </header>
        <Vote />
        <Admin/>
      </div>
    );
  }
}

export default App;
