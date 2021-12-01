import React, { Component } from 'react';

class Sprint extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      title: "titre"
    };
  }

  render() {
    return (
      <div>
        <div class="col-3 column text-center">
          Sprint n°{this.state.id}
        </div>
        <div class="col-3 column">
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