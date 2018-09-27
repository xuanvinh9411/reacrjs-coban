import React, { Component } from 'react';
import TaskItems from './TaskList/TaskItems';
class TaskList extends Component {
  render() {
        var {tasks} = this.props; 
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
                  <input type="text" name="form-control" />
                </td>
                <td>
                  <select className="form-control" name="filterStatus">
                    <option value="{-1}">Tất Cả</option>
                    <option value="{0}">Ẩn</option>
                    <option value="{-1}">Kích Hoạt</option>
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
