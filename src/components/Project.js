import React, { Component } from 'react';
import SprintList from './SprintList';

class Project extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
    };
  }

  render() {
    return (
      <div class="col"> 
        <div class="row column justify-content-center sizeBlockSprint" onClick={() => this.props.accessProject(this.props.id)}>
          {this.state.title}
        </div>
      </div>
    )
  }
}

export default Project;