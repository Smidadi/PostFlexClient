import React, { Component } from 'react';
import KanbanColumn from './KanbanColumn'

class Kanban extends Component {

  constructor(props) {
    super(props);
    this.state = {
      column: []
    };
  }
 
  render() {
    return (
      <div>
        <div class="row">
          
        </div>
        <div>
          <button>
            +
          </button>
        </div>
      </div>
    )
  }
}

export default Kanban;