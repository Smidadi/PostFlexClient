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
  
  handleAddSprint = (event) => {
    event.preventDefault()
    const array = this.state.sprints.slice()
    const num = array.length.toString()
    const id = Date.now()
    this.setState({sprints:[...this.state.sprints, <Sprint id={id} num={num} accessKanban={this.test}/>]})
  }
 
  render() {
    return (
      <div>
        <div class="row">
          {this.state.sprints.map((element, i) => {
            return <div class="sizeSprint">{element}</div>
          })}
        </div>
        <div>
          <button onClick={this.handleAddSprint}>
            +
          </button>
        </div>
      </div>
    )
  }
}

export default SprintList;