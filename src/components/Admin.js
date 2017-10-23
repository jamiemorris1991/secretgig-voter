import React, { Component } from 'react';

export default class Admin extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false
    }
  }


  login() {
    var password = prompt("Enter password", "");
    if (password === null || password === "") {
      console.log("nothing entered");
    } else if(password === 'seven') {
      this.setState({loggedIn:true});
    }
     else {
       alert("incorrect!");
    }
  }

  render() {
    return (
      <div>
        <div className="admin"
          onClick={this.login}>
        <h3>Admin</h3>
        </div>
      </div>
    )
  }
}