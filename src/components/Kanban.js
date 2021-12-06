import React, { Component } from 'react';
import PostitList from './PostitList';

class Kanban extends Component {

  constructor(props) {
    super(props);
    this.state = {
      column: []
    };
  }
 
  render() {
    return (
      <div class="col-2 column">
          <div class="row placeInfos justify-content-center">
              <h5>{this.state.title}</h5>
          </div>
          <PostitList ref={this.postitListRef} />
      </div>
      )
  }
}

export default Kanban;