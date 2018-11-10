import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

export default function tasks3_init(node) {
  let users = window.users;
  let tasks = window.tasks;
  ReactDOM.render(<Tasks3 users={users} tasks={tasks}/>, node);
}

class Tasks3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: props.users,
      tasks: props.tasks,
      ses_user: null,
      token: null,
    };
  }

  handle_logout() {
    let state1 = _.assign({}, this.state, { ses_user: null, token: null});
    this.setState(state1);
  }

  handle_register(ev) {
    ev.preventDefault()
    let form = $("#register-form")
    let password = form.find("[type=password]").val()
    let name = form.find("[type=name]").val()
    this.create_user(name, password)
  }
  
  handle_login(ev) {
    ev.preventDefault()
    let form = $("#register-form")
    let password = form.find("[type=password]").val()
    let name = form.find("[type=name]").val()
    this.create_session(name, password)
  }

  handle_task_input(ev) {
    ev.preventDefault()
    let form = $("#task-input-form")
    let title = form.find("[type=title]").val()
    let desc = form.find("[type=desc]").val()
    let assigned_user_name = form.find("[type=assigned_user_name]").val()
    let found = _.filter(this.state.users, (u) => u.name == assigned_user_name)
    if (found.length > 0) {
      this.create_task(title, desc, found[0].id)
    }
  }

  create_task(title, desc, assigned_user) {
    $.ajax("/api/v1/tasks", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({title, desc, assigned_user}),
      success: (resp) => {
      },
      error: (resp) => {},
    });
  }

  create_user(name, password) {
    $.ajax("/api/v1/users", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({name, password}),
      success: (resp) => {
      },
    });
  }
  create_session(name, password) {
    $.ajax("/api/v1/sessions", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({name, password}),
      success: (resp) => {
        let state1 = _.assign({}, this.state, { ses_user: name, token: resp.data });
        this.setState(state1);
      },
      error: (resp) => {}
    });
  }
	 
  fetch_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        let state1 = _.assign({}, this.state, { users: resp.data });
        this.setState(state1);
      },
    });
  }


  fetch_tasks() {
    $.ajax("/api/v1/tasks", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        let state1 = _.assign({}, this.state, { tasks: resp.data });
        this.setState(state1);
      },
    });
  }

  render() {
    return <div>
      <Router>
	<div>
          <Header root={this} />
	  <Route path="/users" exact={true} render={() =>
	    <UserList users={this.state.users} />
	  } />
	  <Route path="/tasks" exact={true} render={() =>
	    <TaskList tasks={this.state.tasks} users={this.state.users} />
	  } />
	  <Route path="/" exact={true} render={() =>
	    <div>
	      <RenderLogin root = {this} />
	      <RenderTaskInput root = {this} />
	    </div>
	  } />
        </div>
      </Router>
    </div>;
  }
}

  function RenderLogin(props) {
    let {root} = props
    if (root.state.token == null) { 
      return <div className="col-6">
        <form id="register-form" className="form-inline my-2">
          <input type="name" placeholder="name" />
          <input type="password" placeholder="password" />
          <input type="submit" value="Register" className="btn btn-secondary" onClick={root.handle_register.bind(root)}/>
          <input type="submit" value="Login" className="btn btn-secondary" onClick={root.handle_login.bind(root)}/>
        </form>
      </div>
    } else {
      return <div>
	       <p>{root.state.ses_user}</p>
	       <p><Link to={"/"} onClick={root.handle_logout.bind(root)}>Logout</Link></p>
	     </div>
    }
  }

  function RenderTaskInput(props) {
      let {root} = props
      return <div className="col-6">
        <form id="task-input-form" className="form-inline my-2">
          <input type="title" placeholder="title" />
          <input type="desc" placeholder="description" />
          <input type="assigned_user_name" placeholder="assigned user" />
          <input type="submit" value="Create Task" className="btn btn-secondary" onClick={root.handle_task_input.bind(root)}/>
        </form>
      </div>
  }

  function Header(props) {
    let {root} = props;
    return <div className="row my-2">
      <div className="col-4">
        <h1><Link to={"/"}>Task Tracker</Link></h1>
      </div>
      <div className="col-2">
	<p><Link to={"/users"} onClick={root.fetch_users.bind(root)}>Users</Link></p>
	<p><Link to={"/tasks"} onClick={root.fetch_tasks.bind(root)}>Tasks</Link></p>
      </div>
    </div>;
  }

  function TaskList(props) {
    let rows = _.map(props.tasks, (t) => <Task key={t.id} task={t} users={props.users}/>);
    return <div className="row">
      <div className="col-12">
	<table className="table table-striped">
	  <thead>
	    <tr> 
	      <th>Title</th>
	      <th>Description</th>
	      <th>Assigned User</th>
              <th>Completed</th>
	      <th>Time Worked</th>
	    </tr>
	  </thead>
	  <tbody>
	    {rows}
	  </tbody>
	</table>
      </div>
    </div>;
  }

  function UserList(props) {
    let rows = _.map(props.users, (uu) => <User key={uu.id} user={uu} />);
    return <div className="row">
      <div className="col-12">
	<table className="table table-striped">
	  <thead>
	    <tr>
	      <th>name</th>
	    </tr>
	  </thead>
	  <tbody>
	    {rows}
	  </tbody>
	</table>
      </div>
    </div>;
  }

  function Task(props) {
    let {task} = props;
    let {users} = props;
    var new_name;
    var i;
    for(i = 0; i < users.length; i++) {
        if (users[i].id == task.assigned_user) {
	  new_name = users[i].name;
          break;
	}
    }
    var c_string;
    if (task.completed) {
      c_string = "true"
    } else {
      c_string = "false"
    }
    var t_string = task.time_worked.toString()
    return <tr>
      <td>{task.title}</td>
      <td>{task.desc}</td>
      <td>{new_name}</td>
      <td>{c_string}</td>
      <td>{t_string}</td>
    </tr>;
  }

  function User(props) {
    let {user} = props;
    return <tr>
      <td>{user.name}</td>
    </tr>;
  }
