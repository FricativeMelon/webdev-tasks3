import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

export default function tasks3_init(node) {
  let users = window.users;
  ReactDOM.render(<Tasks3 users={users}/>, node);
}

class Tasks3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: props.users,
    };
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

  render() {
    return <div>
      <Router>
	<div>
          <Header root={this} />
	  <Route path="/users" exact={true} render={() =>
	    <UserList users={this.state.users} />
	  } />
        </div>
      </Router>
    </div>;
  }
}

  function Header(props) {
    let {root} = props;
    return <div className="row my-2">
      <div className="col-4">
        <h1><Link to={"/"}>Task Tracker</Link></h1>
      </div>
      <div className="col-2">
	<p><Link to={"/users"} onClick={root.fetch_users.bind(root)}>Users</Link></p>
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

  function User(props) {
    let {user} = props;
    return <tr>
      <td>{user.name}</td>
    </tr>;
  }
