import React, { Component } from 'react';
import Project from './Project';
import { v4 as uuidv4 } from 'uuid';

class ProjectList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      projects: []//[<Project />]
    };
  }
  
  componentDidMount = () => {
    const requestOptions = {
      method: 'GET', 
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    };
    const id_user = 0;
    fetch("http://localhost:3001/projet/all_projects_from_user/" + id_user, requestOptions)
        .then(res => res.json())
        .then(res => this.updateProjectList(res))
        .catch(err => err)
  }

  updateProjectList = (projectList) => {
    console.log("PROJECT LIST");
    projectList.forEach(element => {
      console.log(element);
      this.setState({projects:[...this.state.projects, <Project id={element.id_projet} title={element.name} 
        accessProject={this.props.accessProject}/>]})
    });
  }

  handleAddProject = (event) => {
    event.preventDefault()
    const array = this.state.projects.slice()
    const num = array.length.toString()
    const id = uuidv4();
    const title = num;
    console.log(id);
    this.setState({projects:[...this.state.projects, <Project id={id} title={title} accessProject={this.props.accessProject}/>]})
  
    const headers = new Headers();
    const restQry = {
      method : 'POST',
      headers : headers,
      mode : 'cors'
    };
    fetch('http://localhost:3001/projet/add_new/' + id + "/" + 0 + "/" + title, restQry);
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
            Ajouter un projet
          </button>
        </div>
      </div>
    )
  }
}

export default ProjectList;