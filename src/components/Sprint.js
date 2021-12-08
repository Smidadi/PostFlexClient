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
      <div>
        <div class="col-3 column text-center">
          Sprint n°{this.state.num}
        </div>
        <div class="col-3 column" onClick={() => this.props.accessKanban(this.state.kanban)}>
          <div class="row placeInfos justify-content-center">
            kanban
          </div>
        </div>
        <div class="col-3 column">
          <div class="row placeInfos justify-content-center">
            planning
          </div>
        </div>
      </div>
    )
  }
}

export default Sprint;