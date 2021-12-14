import React, { Component } from 'react';
import Project from './Project';

class ProjectList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      projects: []//[<Project />]
    };
  }
  
  handleAddProject = (event) => {
    event.preventDefault()
    const array = this.state.projects.slice()
    const num = array.length.toString()
    this.setState({projects:[...this.state.projects, <Project num={num} accessProject={this.props.accessProject}/>]})
  }
 
  render() {
    return (
      <div>
        <div class="row">
          {this.state.projects.map((element, i) => {
            return <div class="sizeSprint">{element}</div>
          })}
        </div>
        <div class="row">
          <button class="addColumn" onClick={this.handleAddProject}>
            Ajouter un Projet
          </button>
        </div>
      </div>
    )
  }
}

export default ProjectList;