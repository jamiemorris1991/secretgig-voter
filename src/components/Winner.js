import React, { Component } from 'react';
import Iframe from 'react-iframe';

class Winner extends Component {   
  constructor(props) {
    super(props);
    this.state ={
      winner: null,
      url: 'http://tv.giphy.com/globe'
    };
  }

  render() { 
    return(
      <div className="winner">
        <Iframe url={this.state.url}
          width="800px"
          height="800px"
          display="initial"
          position="relative"
          allowFullScreen/> 
      </div>
    )
  }   
};

export default Winner;
