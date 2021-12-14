import React, { Component } from 'react';
import Sprint from './Sprint';

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
    this.addAllCreatedSprint();
  }
  
  handleAddSprint = (event) => {
    event.preventDefault()
    const array = this.state.sprints.slice()
    const num = array.length.toString()
    this.setState({sprints:[...this.state.sprints, <Sprint num={num} accessKanban={this.test}/>]})
    this.addNewSprintInBdd(num);  
  }

  addNewSprintInBdd = (num) => {
    const headers = new Headers();
    const restQry = {
      method : 'POST',
      headers : headers,
      mode : 'cors'
    };
    const date = new Date();
    fetch('http://localhost:3001/sprint/new/'+num+'/'+date.getDay()+'-'+date.getMonth()+'-'+date.getFullYear(),restQry);
  }

  addAllCreatedSprint = async () => {
    await fetch('http://localhost:3001/sprint/all/')
    .then(response => {
      response.json().then((res) => {
       res.forEach(element => {
          this.setState({sprints:[...this.state.sprints, <Sprint num={element.id}/>]})    
       }); 
      });
    })
    .catch((err) => {
      console.error(err);
    })
  }

  componentDidMount() {
    this.addAllCreatedSprint();
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