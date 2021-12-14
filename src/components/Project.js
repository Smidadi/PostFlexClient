import React, { Component } from 'react';

class Project extends Component {

  constructor(props) {
    super(props);
    this.state = {
      num: props.num,
      title: "titre"
    };
  }

  render() {
    return (
      <div class="col"> 
        <div class="row column justify-content-center sizeBlockSprint" onClick={() => this.props.accessProject(this.state.sprintList)}>
          {this.state.title}
        </div>
      </div>
    )
  }
}

export default Project;