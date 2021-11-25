import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import KanbanColumn from './components/KanbanColumn';
import ProductBacklog from './components/ProductBacklog';
import Authentification from './components/Authentification';
import MainInfosBar from './components/MainInfosBar';
import SprintColumn from './components/SprintColumn';

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
      <div className="container-fluid">
          <div class="row">
            <MainInfosBar />
            <Authentification />
          </div>
      </div>
      </header>
      <div className="container-fluid">
      <div className="row border border-dark">
          <ProductBacklog />
          <div className="col-8">
              <div className="row">
                <SprintColumn />
              </div>
          </div>
      </div>
      </div>
    </div>
    )
  }
}

export default App;
