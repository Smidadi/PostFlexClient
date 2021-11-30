import React, { Component } from 'react';

class KanbanColumn extends Component {

  constructor(props) {
    super(props);
    this.state = { title: 'title', max: 100, postits: ''};
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
      <div class="col-3">
        <div class="row"></div>
        <div class="row column border border-black">
            <div>{this.state.title}</div>
          </div>
      </div>
    )
  }
}

export default KanbanColumn;