import React, { Component } from 'react';

import '../styles/voter.css';

export default class Voter extends Component {
  constructor(){
    super();
    this.state = {
      a: 0,
      b: 0
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
      a: option.isFirst ? this.state.a + 1: this.state.a,
      b: !option.isFirst ? this.state.b + 1 : this.state.b,
    })
  }

  render() {
    let options = [];
    options.push(this.renderOption({ isFirst: true, name: "Brexit", count:0}));
    options.push(this.renderOption({ isFirst: false, name: "Remain", count:0}));

    return (
      <div>
        <div className="voter">
          {options}
        </div>
        <div>
          votes for A: {this.state.a};
          votes for B: {this.state.b};
        </div>
      </div>
    );
  }
}

class Option extends Component {
  render() {
    return (
      <button className="option" onClick= {this.props.onClick}>
        <div>
          {this.props.name}
        </div>
      </button>
    );
  }
}
