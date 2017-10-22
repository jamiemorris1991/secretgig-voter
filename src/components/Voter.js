import React, { Component } from 'react';
import '../styles/voter.css';
import ReactCountdownClock from 'react-countdown-clock';
import Responsive from 'react-responsive';  


const Desktop = ({ children }) => <Responsive minWidth={992} children={children} />;
const Tablet = ({ children }) => <Responsive minWidth={768} maxWidth={992} children={children} />;
const Mobile = ({ children }) => <Responsive maxWidth={768} children={children} />;
const Default = ({ children }) => <Responsive minWidth={768} children={children} />;


export default class Vote extends Component {
  constructor(){
    super();
    this.state = {
      aCount: 0,
      bCount: 0,
      startTime: Date.now(),
      duration: 60,
      isBlocked: false,
      status: "No Votes yet!"
    }
  }

  renderOption(option) {
    return (
      <div>
        <Option
          isFirst={option.isFirst}
          name={option.name}
          onClick={() => this.handleClick(option)}
          />
        </div>
    );
  }

  handleClick(option) {
    var votes = {
      a: option.isFirst ? this.state.aCount + 1: this.state.aCount,
      b:  !option.isFirst ? this.state.bCount + 1 : this.state.bCount,
      status: ""
    }

    if (votes.a > votes.b) {
      votes.status = option.name + " is Winning";
    } else if (votes.a < votes.b) {
      votes.status = option.name + " Is Winning";
    } else if (votes.a === votes.b) {
      votes.status = "Currently a draw!";
    }
    
    this.setState({
      aCount: votes.a,
      bCount: votes.b,
      status: votes.status
    });
    // this.blockVote();
  }

  blockVote() {
    this.setState({isBlocked: true})
    setTimeout( () => {
      this.setState({isBlocked: false})
    }, 30000)
  }

  renderDesktop() {
    return(
      <div>
        <h2 className="status">{this.state.status}</h2>
      </div>
    );
  }

  render() {
    return(
      <div>
        <Desktop>{this.renderDesktop()}</Desktop>
        <Mobile>{this.renderMobile()}</Mobile>
      </div>
    );
  }

  renderMobile() {
    let options = [];
    options.push(this.renderOption({ isFirst: true, name: "Brexit", count:0}));
    options.push(this.renderOption({ isFirst: false, name: "Remain", count:0}));

    return (
        <div>
          {!this.state.isBlocked  && 
            <div>
              <h2> Voting LIVE</h2>
              <div className="voter">
                {options}
              </div>
              <div>
                votes for A: {this.state.aCount};
                votes for B: {this.state.bCount};
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
}

function Option(props) {
    return (
      <button 
        className={"option" + (props.isFirst ? 'A' : 'B')} 
        onClick= {props.onClick}>
        <div>
          {props.name}
        </div>
      </button>
    );
}
