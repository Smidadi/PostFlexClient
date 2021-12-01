import React, { Component } from 'react';

class SprintColumn extends Component {

  constructor(props) {
    super(props);
    this.state = { id: 1};
  }

  render() {
    return (
        <div>
            Sprint: {this.state.id}
        </div>
    )
  }
}

export default SprintColumn;