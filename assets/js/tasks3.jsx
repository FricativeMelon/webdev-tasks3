import React from 'react';
import ReactDOM from 'react-dom';

export default function tasks3_init(root) {
  ReactDOM.render(<Tasks3 />, root);
}

class Tasks3 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>
      <h2>Tasks3 loaded.</h2>
    </div>;
  }
}
