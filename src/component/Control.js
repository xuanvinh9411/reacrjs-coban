import React, { Component } from 'react';
import Search from './Control/Search';
import Sort from './Control/Sort';

class Control extends Component {
  render() {
    return (
      <div className="row">
        <Search />
        <Sort />
      </div>
    );
  }
}

export default Control;
