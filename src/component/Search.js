import React, { Component } from 'react';

class Search extends Component {
  constructor(props){
      super(props);
      this.state = {
        keyword : ''
      }
  }

  onChange = (event) =>{
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name] : value
    });

  }
  onSearch =() =>{
    console.log(this.state);
  }
  render() {
    return (
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <div className="input-group">
            <input type="text" name="keyword" onChange={this.onChange} className="form-control" placeholder="Nhập từ khóa ...." />
            <span className="input-group-btn">
              <button type="button" onClick={this.onSearch } className="btn btn-primary">
              <span className="fa fa-search" />Tìm </button>
            </span>
          </div>
        </div>
    );
  }
}

export default Search;
