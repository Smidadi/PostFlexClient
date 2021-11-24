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
      <div class="col-4 border-right border-black">
        <div class="row">
            <div>{this.state.title}</div>
        </div>
        <div class="row">
            <div class="col-6">
                <div class="row">

                </div>
            </div>
            <div class="col-6 border border-black">
                <div class="row">
                    +
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default KanbanColumn;