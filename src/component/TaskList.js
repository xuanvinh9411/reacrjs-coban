import React, { Component } from 'react';
import TaskItems from './TaskList/TaskItems';
class TaskList extends Component {
  constructor(props){
      super(props);
      this.state = {
        filterName : '',
        filterStatus : -1
      }
  }
  onChange = (event)=>{
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.props.onFilter(
      name === 'filterName' ? value : this.state.filterName,
      name === 'filterStatus' ? value : this.state.filterStatus,
                        );
    this.setState({
      [name] : value
    });
  }
  onSearch = (keyword)=>{
    this.setState({
      keyword : keyword
    })
  }
  render() {
        var {tasks} = this.props; 
        var {filterName ,filterStatus} = this.state; 
        var elmTasks = tasks.map((tasks,index)=>{
          return <TaskItems
                      key={tasks.id}
                      index={index} 
                      tasks={tasks}
                      onUpdateStatus = { this.props.onUpdateStatus }
                      onDelete = { this.props.onDelete }
                      onUpdate = { this.props.onUpdate }
                   />
        });
    return (
      <div className="row mt-15">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Trạng Thái</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td />
                <td>
                  <input 
                        type="text" 
                        className="form-control" 
                        name="filterName" 
                        value = {filterName}
                        onChange = {this.onChange}
                        />
                </td>
                <td>
                  <select 
                          className="form-control" 
                          name="filterStatus"
                          value = {filterStatus}
                          onChange = {this.onChange}
                          >
                    <option value={-1}>Tất Cả</option>
                    <option value={0}>Ẩn</option>
                    <option value={1}>Kích Hoạt</option>
                  </select>
                </td>
                <td />
              </tr>
              {elmTasks}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default TaskList;
