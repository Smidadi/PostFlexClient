import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import KanbanColumn from './components/KanbanColumn';
import Authentification from './components/Authentification';
import MainInfosBar from './components/MainInfosBar';
import Sprint from './components/Sprint';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { apiResponse: ''};
  }

  callAPI() {
      fetch("http://localhost:9000/testAPI")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }))
          .catch(err => err);
  }

  componentDidMount() {
      this.callAPI();
  }

  render() {
    return (
<div>
<header>
<div class="container-fluid">
    <div class="row">
      <MainInfosBar />
      <Authentification />
    </div>
</div>
</header>
<div class="container-fluid">
<div class="row border border-dark">
    <KanbanColumn />
  <div class="col-1"></div>
    <div class="col-8">
        <div class="row">
           <Sprint />
        </div>
    </div>
</div>
</div>
</div>
    )
  }
}

export default App;