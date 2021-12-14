import React, { Component } from 'react';
import SprintList from './SprintList';

class Project extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
    };
  }

  accessProject = () => {
    console.log(this.props.id);
    this.props.accessProject(this.props.id)
  }

  render() {
    return (
      <div class="col"> 
        <div class="row column justify-content-center sizeBlockSprint" onClick={this.accessProject}>
          {this.state.title}
        </div>
      </div>
    )
  }
}

export default Project;