import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

import votedata from '../data';

export default class VoteTable extends Component {
  handleButtonClick(e, row) {
    console.log(row);
    var vote = votedata.find((elem) => {
      return elem.vote === row.vote
    });
    this.startVote(vote)
  }

  startVote(vote) {
    this.update().bind(this);
  }

  update () {
    this.props.onUpdate(this.refs.myInput.getDOMNode().value);
  }

  render() {
    const data = votedata;
    
    const columns = [{
      Header: 'Vote',
      accessor: 'vote' // String-based value accessors!
    }, {
      Header: 'A',
      accessor: 'optionA',
    }, {
      Header: 'B',
      accessor: 'optionB',
    },{
      id: 'click-me-button',
      Cell: ({ row }) => (<button onClick={(e) => this.handleButtonClick(e, row)}>Start!</button>)
    }]

    return(
        <ReactTable
          data={data}
          columns={columns}/>
    );
  }

}