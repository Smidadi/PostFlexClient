import React, { Component } from 'react';
import Sprint from './Sprint';

class SprintList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sprints: [<Sprint id="0"/>]
    };
  }
 
  handleAddSprint = (event) => {
    event.preventDefault()
    const array = this.state.sprints.slice()
    const id = array.length.toString()
    this.setState({sprints:[...this.state.sprints, <Sprint id={id}/>]})
  }
 
  render() {
    return (
      <div>
        <div class="row">
          {this.state.sprints.map((element, i) => {
            return <div class="col resizeSprint">{element}</div>
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