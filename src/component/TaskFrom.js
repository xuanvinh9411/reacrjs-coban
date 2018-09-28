import React, { Component } from 'react';

class TaskFrom extends Component {
  constructor(props){
    super(props);
    this.state = {
      id : '',
      name : '',
      status : false
    }
  }
  componentWillMount(){
    if(this.props.task){
      this.setState({
        id :this.props.task.id,
        name :this.props.task.name,
        status :this.props.task.status
      });
    }
  }

  componentWillReceiveProps(nextProps){
     if(nextProps && nextProps.task){
      this.setState({
        id :nextProps.task.id,
        name :nextProps.task.name,
        status :nextProps.task.status
      });
    }else if(!nextProps.task){
       this.setState({
      id : '',
      name : '',
      status : false
    });
    }
  }

  onCloseForm=()=>{
        this.props.onCloseForm();
      }
  onChange =(event)=>{
    var target = event.target;
    var name = target.name;
    var value = target.value;
    if(name === 'status'){
      value = target.value === "true" ? true : false
    }
    this.setState({
      [name]:value
    });
  }
  onSubmit = (event) =>{
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.onCloseForm();
    this.onClear();
  }
  onClear =()=>{
    this.setState({
      name :'',
      status : false 
    });
  }
  render() {
    var { id } = this.state;
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title ">
          { id === '' ? 'Thêm Công việc' : 'Cập Nhật Công Việc' }
            <span className="fa fa-times-circle text-r-i"
            onClick={ this.onCloseForm }
             > </span>
          </h3>
        </div>
        <div className="panel-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Tên :</label>
              <input 
              type="text" name="name"
               className="form-control" 
               value={this.state.name}
               onChange={this.onChange}
              />
            </div>
            <label>Trạng Thái:</label> &nbsp;
            <select className="form-group" name="status"
              value={this.state.status}
               onChange={this.onChange}
            >
              <option value={true}>Kích Hoạt</option>
              <option value={false}>Ẩn</option>
            </select>
            <div className="text-center">
              <button type="submit" className="btn btn-warning"><span className="fa fa-plus mr-5" /> Lưu Lại</button> &nbsp;
              <button type="button" onClick={ this.onClear } className="btn btn-danger"><span className="fa fa-close mr-5" />Hủy Bỏ</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TaskFrom;
