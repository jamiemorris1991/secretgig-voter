import React, { Component } from 'react';

export default class Admin extends Component {

  login() {
    var password = prompt("Enter password", "");
    if (password === null || password === "") {
      console.log("nothing entered");
    } else {
      alert(password === "seven" ? "seven": "incorrect!")
    }
  }

  render() {
    return (
      <div className="admin"
        onClick={this.login}>
        <h3>Admin</h3>
      </div>
    )
  }
}