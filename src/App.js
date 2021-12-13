import React, { Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Kanban from './components/Kanban';
import ProductBacklog from './components/ProductBacklog';
import Authentification from './components/Authentification';
import MainInfosBar from './components/MainInfosBar';
import SprintList from './components/SprintList';
import BlockToDisplay from './components/BlockToDisplay';

import {ProductBacklogContext} from './components/Context';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      apiResponse: '',
      sprintHide: true
    };

    this.productBacklogRef = React.createRef();
  }

  callAPI() {
      fetch("http://localhost:3000/testAPI")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }))
          .catch(err => err);
  }

  componentDidMount() {
      this.callAPI();
  }

  render() {
    return (
    <ProductBacklogContext.Provider value={this.productBacklogRef}>
    <div>
      <header>
      <div className="container-fluid">
          <div class="row">
            <MainInfosBar />
            <Authentification />
          </div>
      </div>
      </header>
      <div class="container-fluid">
        <div class="row">
          <ProductBacklog ref={this.productBacklogRef}/>
        <div class="col-1"></div>
        <BlockToDisplay />
        </div>
      </div>
    </div>
    </ProductBacklogContext.Provider>
    )
  }
}

export default App;
