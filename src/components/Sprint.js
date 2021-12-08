import React, { Component } from 'react';

import Kanban from './Kanban';

class Sprint extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      num: props.num,
      title: "titre",
      kanban: <Kanban title={"kanban du sprint n°"+props.num}/>
    };
  }

  render() {
    return (
      <div class="col"> 
        <div class="row column justify-content-center sizeTitleSprint">
          Sprint n°{this.state.num}
        </div>
        <div class="row column justify-content-center sizeBlockSprint">
          kanban
        </div>
        <div class="row column justify-content-center sizeBlockSprint">
          planning
        </div>
      </div>
    )
  }
}

export default Sprint;