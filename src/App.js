import React, { Component } from 'react';
import './App.css';

import Voter from './components/Voter';
import VoteTable from './components/VoteTable';
import Winner from './components/Winner';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      next: 1,
      currentVote: null,
      votingLive: false,
      loggedIn: false,
      votes: [],
      winner: 'First Vote starting soon!',
      winnerURL: 'http://tv.giphy.com/globe'
    };
  }

  componentDidMount() {
    axios.get(`/votes`)
    .then(res => {
      this.setState({votes: res.data});
    })
  }
  
  renderMain() {
      if(this.state.loggedIn){
        return (
        <div>
           <VoteTable votes={this.state.votes}/>
          <h3>Back</h3>
        </div>
       );
      }
      if (this.state.votingLive) {
        return <Voter vote={this.state.currentVote}/>
      }
      else return (
       <div>
         <div>NEW VOTE SOON</div>
         <Winner winner={this.state.winner} url={this.state.winnerURL}/>
       </div>
      );
  }

  login() {
    var password = prompt("Enter password", "");
    if (password === null || password === "") {
      console.log("nothing entered");
    } else if(password === 'seven') {
      this.setState({loggedIn: true});
    }
     else {
       alert("incorrect!");
    }
  }

  startnextVote(){
    var password = prompt("Enter password", "");
    if (password === null || password === "") {
      console.log("nothing entered");
    } else if(password === 'seven') {
      var voteToStart = this.state.votes.find((elem) => {
        return elem.vote === this.state.next
      });
      this.setState({ 
        votingLive : true,
        currentVote: voteToStart
      });
    }
     else {
       alert("incorrect!");
    }

    setTimeout( () => {
      this.endVote();
      this.setState({
        votingLive : false,
        currentVote: null
      })
      
    }, 180000)
 }

 endVote() {
  var oldVote = this.state.currentVote;

  if(oldVote.votesForA > oldVote.votesForB) {
        this.setState({
          winner: oldVote.optionA,
          winnerURL: oldVote.aUrl
        });
  } else if (oldVote.votesForA < oldVote.votesForB) {
    this.setState({
      winner: oldVote.optionA,
      winnerURL: oldVote.aUrl
    });
  } else {
    this.setState({
      winner: "It was a draw!!!",
      winnerURL: 'http://tv.giphy.com/oops'
    });
  }
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Horror Democracy</h1>
        </header>
        {this.renderMain()}
        <div className="admin"
          onClick={this.login.bind(this)}>
          <h3>Admin</h3>
        </div>
        <div className="admin"
          onClick={this.startnextVote.bind(this)}>
          <h3>Start Next Vote</h3>
        </div>
      </div>
    );
  }
}

export default App;
