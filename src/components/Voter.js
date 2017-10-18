import React, { Component } from 'react';
import '../styles/voter.css';
import ReactCountdownClock from 'react-countdown-clock';

export default class Vote extends Component {
  constructor(){
    super();
    this.state = {
      aCount: 0,
      bCount: 0,
      startTime: Date.now(),
      duration: 60,
      isBlocked: false
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
    //option.isFirst ? this.state.a++ : this.state.b++
    this.setState({
      aCount: option.isFirst ? this.state.aCount + 1: this.state.aCount,
      bCount: !option.isFirst ? this.state.bCount + 1 : this.state.bCount,
    })
    this.blockVote();
  }

  blockVote() {
    this.setState({isBlocked: true})
    setTimeout( () => {
      this.setState({isBlocked: false})
    }, 30000)
  }


  render() {
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
