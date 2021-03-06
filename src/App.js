import React, { Component } from 'react';
import TaskFrom from './component/TaskFrom';
import TaskList from './component/TaskList';
import Control from './component/Control';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      tasks : [],
      IsDisplayFrom : false,
      TaskEditing : null
    }
  }

  // ---componet chạy đầu tiên
  componentWillMount(){
    if(localStorage && localStorage.getItem('tasks')){
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks : tasks
      });
    }
  }

  // create ID random
  s4(){
    return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
  }

  // tạo chuổi ID
  generateID(){
    return this.s4() + this.s4() + '_' + this.s4() + '_' + this.s4() + '_' + this.s4() + '_' + this.s4() + '_' + this.s4() + '_' + this.s4()
  }
  onToggleForm = () =>{
    this.setState({
       IsDisplayFrom : !this.state.IsDisplayFrom
    });
  }

  // ---Close Form đăng ký
   onCloseForm = () =>{
    this.setState({
      IsDisplayFrom : false
    });
  }
  // ---Show Form đăng ký
   onShowForm = () =>{
    this.setState({
      IsDisplayFrom : true
    });
  }

  // create data + update
  onSubmit = (data) =>{
    var {tasks} = this.state; //var tasks = this.state.tasks;
    if(data.id === ''){
      data.id = this.generateID();
      tasks.push(data); 
    }else{
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }
   
    this.setState({
       tasks : tasks,
      // TaskEditing : null
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
  }

// ---Update Status
  onUpdateStatus = (id) =>{
    var { tasks } = this.state;
    var i = this.findIndex(id);
    if(i !== -1){
      
      tasks[i].status = !tasks[i].status;
      this.setState({
        tasks : tasks 
      });
      localStorage.setItem('tasks',JSON.stringify(tasks));
    }
  }

// ---Delete
  onDelete = (id) =>{
    var { tasks } = this.state;
    var i = this.findIndex(id);
    if(i !== -1){
      tasks.splice(i,1);
      this.setState({
        tasks : tasks 
      });
      localStorage.setItem('tasks',JSON.stringify(tasks));
    }
  }

  // ---Update
   onUpdate = (id) =>{
    var { tasks } = this.state;
    var i = this.findIndex(id);
    var TaskEditing = tasks[i];
    console.log(TaskEditing);
    this.setState({
      TaskEditing : TaskEditing
    });
    this.onShowForm();
  }

  // ---Get ID
  findIndex =(id) =>{
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((tasks , index) => {
      if(tasks.id === id){
        result = index;
      }
    });
    return result;
  }

  render() {
    var {tasks , IsDisplayFrom , TaskEditing} = this.state // var tasks = this.state.tasks
    var elmTaskForm = IsDisplayFrom === true ? <TaskFrom onSubmit={this.onSubmit}
                                                         onCloseForm = {this.onCloseForm}
                                                         task = { TaskEditing }
                                                /> 
    : '';
    return (
      <div className="container">
        <div className="row">

          <div className= { IsDisplayFrom === true ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4 ' : '' }>
            {elmTaskForm}
          </div>

          <div className={IsDisplayFrom === true ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8 ' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12' } >
            <button type="button" className="btn-primary m-15"
            onClick = {this.onToggleForm}
            >
              <span className="fa fa-plus">  </span>
            </button>
            <Control/>
            <TaskList 
            tasks = {tasks}
            onUpdateStatus = {this.onUpdateStatus }
            onDelete = {this.onDelete }
            onUpdate = {this.onUpdate }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
