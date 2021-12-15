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
import Sprint from './components/Sprint';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      apiResponse: '',
      isProjectOpen: false,
      isConnected: false,
      projectId: null,
      productBacklogId: null,
      sprintHide: true,
      idUser: null
    };

    this.productBacklogRef = React.createRef();
    this.blockToDisplayRef = React.createRef();
  }

  onConnection = (idUser) => {
    this.setState({isConnected: true, idUser: idUser});
    this.blockToDisplayRef.current.connect(this.state.idUser, this.onProjectOpened, this.onProjectClosed);
  }
  
  onConnectionClosed = () => {
    this.blockToDisplayRef.current.disconnect();
    this.setState({isConnected: false, productBacklogId: null, isProjectOpen: false});
  }

  onProjectOpened = (id) => {

    this.setState({projectId: id});

    // check if product backlog exists
    const requestOptions = {
      method: 'GET', 
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    };
    fetch("http://localhost:3001/colonne/all/" + id, requestOptions)
        .then(res => res.json())
        .then(async res => await this.updateProductBacklog(res))
        .catch(err => err)

  }

  updateProductBacklog = (res) => {

    // product backlog does not exist
    if(res.length === 0){
      const requestOptions = {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors'
      };
      fetch("http://localhost:3001/colonne/new/" + this.state.projectId + "/" + this.state.projectId + "/Product Backlog", requestOptions)
    }
    
    this.setState({isProjectOpen: true, productBacklogId: this.state.projectId});
  }

  onProjectClosed = () => {
    this.setState({isProjectOpen: false, productBacklogId: null});
  }
  
  render() {
    return (
    <ProductBacklogContext.Provider value={this.productBacklogRef}>
    <div>
      <header>
      <div className="container-fluid">
          <div class="row">
            <MainInfosBar isProjectOpen={this.state.isProjectOpen} isConnected={this.state.isConnected}/>
            <Authentification onConnection={this.onConnection} onConnectionClosed={this.onConnectionClosed}/>
          </div>
      </div>
      </header>
      {this.state.isConnected === true ?
        <div class="container-fluid ">
          <div class="row">
            {this.state.productBacklogId !== null ?
            <ProductBacklog ref={this.productBacklogRef} id={this.state.productBacklogId} />
            :
            null}
          <div class="col-1"></div>
          <BlockToDisplay ref={this.blockToDisplayRef} idUser={this.state.idUser} openProject={this.onProjectOpened} closeProject={this.onProjectClosed}/>
          </div>
        </div>
        :
        null}
    </div>
    </ProductBacklogContext.Provider>
    )
  }
}

export default App;
