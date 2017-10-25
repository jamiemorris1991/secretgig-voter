import React, { Component } from 'react';
import Iframe from 'react-iframe';

class Winner extends Component {   

  render() { 
    return(
      <div className="winner">
        <h3>{this.props.winner}</h3>
        <Iframe url={this.props.url}
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
