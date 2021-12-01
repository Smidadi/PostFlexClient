import React, { Component } from 'react';

class Sprint extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      title: "titre"
    };
  }

  render() {
    return (
        <div>
            {this.state.id}
            {this.state.title}
        </div>
    )
  }
}

export default Sprint;