import React, { Component } from 'react';

class Sprint extends Component {

  constructor(props) {
    super(props);
    this.state = { id: 1};
  }

  callAPI() {
      /*fetch("http://localhost:9000/testAPI/buttonClicked")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }))
          .catch(err => err);*/
  }

  render() {
    return (
        <div>
            Sprint: {this.state.id}
        </div>
    )
  }
}

export default Sprint;