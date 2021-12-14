import React, { Component } from 'react';
import Sprint from './Sprint';
import { v4 as uuidv4 } from 'uuid';

class SprintList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      sprints: []
    };
  }
  
  test = (kanban) => {
    this.props.accessKanban2(kanban)
  }

  componentDidMount = () => {
    const requestOptions = {
      method: 'GET', 
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    };
    const id_user = 0;
    fetch('http://localhost:3001/sprint/all', requestOptions)
        .then(res => res.json())
        .then(res => this.updateSprintList(res))
        .catch(err => err)
  }

  updateSprintList = (sprintList) => {
    console.log("SPRINT LIST");
    sprintList.forEach(element => {
      console.log(element);
      if(element.id_projet === this.props.id_project) {
      this.setState({sprints:[...this.state.sprints, <Sprint id={element.id} id_projet={element.id_projet} title={element.titre} accessKanban={this.test}/>]})    
      }
    }); 
  }
  
  handleAddSprint = (event) => {
    event.preventDefault()
    const array = this.state.sprints.slice()
    const num = array.length.toString()
    const id = uuidv4();
    this.setState({sprints:[...this.state.sprints, <Sprint id={id} id_project={this.props.id_project} title={num} accessKanban={this.test}/>]})
    this.addNewSprintInBdd(id, this.props.id_project, num);  
  }

  addNewSprintInBdd = (id, id_project, title) => {
    const headers = new Headers();
    const restQry = {
      method : 'POST',
      headers : headers,
      mode : 'cors'
    };
    const date = new Date();
    fetch('http://localhost:3001/sprint/new/'+id+'/'+date.getDay()+'-'+date.getMonth()+'-'+date.getFullYear() + "/" +
                                          id_project + "/" + title,restQry);
  }
 
  render() {
    return (
      <div>
        <div class="row">
          {this.state.sprints.map((element, i) => {
            return <div class="sizeSprint">{element}</div>
          })}
        </div>
        <div class="row">
          <button class="addColumn" onClick={this.handleAddSprint}>
            Ajouter un sprint
          </button>
        </div>
      </div>
    )
  }
}

export default SprintList;