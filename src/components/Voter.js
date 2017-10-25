import React, { Component } from 'react';
import '../styles/voter.css';
import ReactCountdownClock from 'react-countdown-clock';
import Responsive from 'react-responsive';
import axios from 'axios';

const Desktop = ({ children }) => <Responsive minWidth={992} children={children} />;
const Mobile = ({ children }) => <Responsive maxWidth={768} children={children} />;
export default class Vote extends Component {
  constructor(props){
    super(props);
    this.state = {
      vote: {},
      isBlocked: false,
      status: "No Votes yet!"
    }
  }

  componentDidMount() {
    axios.get(`/votes/` + this.props.vote.vote)
      .then(res => {
        console.log(res);
        this.setState({ vote: res.data });
      });
  }

  renderOption(option) {
    return (
      <div>
        <Option
          isA={option.isA}
          name={option.name}
          onClick={() => this.handleClick(option)}
          />
        </div>
    );
  }

  handleClick(option) {
    var choice = option.isA ? "A" : "B";
    this.sumbitVote(choice);
    this.updateStatus();
    this.blockVote();
  }

  sumbitVote(choice) {
    var incrementVote = this.state.vote;
    if (choice === "A") {
      incrementVote.aCountCount++;
    } else if (choice === "B") {
      incrementVote.bCountCount++;
    }
    axios.patch('/votes/' + this.props.vote.vote, {
      aCount: incrementVote.aCount,
      bCount: incrementVote.bCount
    }).then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    this.setState({vote: incrementVote});
  }

  updateStatus() {
    var vote = this.state.vote;
    var status = this.state.status;

    if (vote.aCount > vote.bCount) {
      status = vote.optionB + " is Winning";
    } else if (vote.aCount < vote.bCount) {
      status = vote.optionB + " Is Winning";
    } else if (vote.aCount === vote.bCount) {
      status = "Currently a draw!";
    }
    this.setState({status: status});
  }

  blockVote() {
    this.setState({isBlocked: true})
    setTimeout( () => {
      this.setState({isBlocked: false})
    }, 30000)
  }

  renderDesktop() {
    let vote = this.state.vote;
    console.log(vote);
    return(
      <div>
        <h2 className="status">{this.state.status}</h2>
      </div>
    );
  }

  renderMobile() {
    return (
        <div>
          {!this.state.isBlocked  && 
            <div>
              <h2> Voting LIVE</h2>
              <div className="voter">
                {this.renderOption({ isA: true, name: this.state.vote.optionA, count: this.state.vote.aCount})}
                {this.renderOption({ isA: false, name: this.state.vote.optionB, count: this.state.vote.bCount})}
              </div>
              <div>
                votes for A: {this.state.vote.aCount};
                votes for B: {this.state.vote.bCount};
              </div>
            </div>
          }
          {this.state.isBlocked && 
            <div className="timeout">
              <h2> THANKS FOR VOTING </h2>
              <h3> You can vote again in:</h3>
              <div className = "clock">
              <ReactCountdownClock 
                seconds={30}
                color="#ccc"
                alpha={0.9}
                size={500}
                onComplete={console.log("foo")} />  
              </div>
            </div>
          }
        </div>
    );
  }

  render() {
    return(
      <div>
        <h3>{this.props.vote.optionA} vs. {this.props.vote.optionB}</h3> 
        <Desktop>{this.renderDesktop()}</Desktop>
        <Mobile>{this.renderMobile()}</Mobile>
      </div>
    );
  }
}

function Option(props) {
    return (
      <button 
        className={"option" + (props.isA ? 'A' : 'B')} 
        onClick= {props.onClick}>
        <div>
          {props.name}
        </div>
      </button>
    );
}
