import React, { Component } from 'react';

class KanbanColumn extends Component {

  constructor(props) {
    super(props);
    this.state = { title: 'Product backlog', max: 100, postits: ''};
  }

  callAPI() {
      /*fetch("http://localhost:9000/testAPI/buttonClicked")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }))
          .catch(err => err);*/
  }

  setTitle(title) {
      this.setState({title: title});
  }

  setMax(max) {
    this.setState({max: max});
  }

  render() {
    return (
      <div class="col-3 column">
        <div class="row placeInfos justify-content-center">
          {this.state.title}
        </div>
        <div class="row placeInfos justify-content-center">
          +
        </div>
      </div>
    )
  }
}

export default KanbanColumn;