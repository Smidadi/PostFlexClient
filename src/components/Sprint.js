import React, { Component } from 'react';
import Kanban from './Kanban';

class Sprint extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      kanban: <Kanban id_sprint={this.props.id} title={"kanban du sprint n°"+props.num}/>
    };
  }

  render() {
    return (
      <div class="col"> 
        <div class="row column justify-content-center sizeTitleSprint">
          Sprint n°{this.state.title}
        </div>
        <div class="row column justify-content-center sizeBlockSprint" onClick={() => this.props.accessKanban(this.state.kanban)}>
          kanban
        </div>
      </div>
    )
  }
}

export default Sprint;