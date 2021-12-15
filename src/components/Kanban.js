import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import KanbanColumn from './KanbanColumn';
import Postit from './Postit';
import {ProductBacklogContext} from './Context';

class Kanban extends Component {

  static contextType = ProductBacklogContext;

  constructor(props) {
    super(props);
    this.state = {
      productBacklogRef: null,
      hasCreatedBacklogFunction: false,
      isMovingPostit: false,
      columns: []//[<KanbanColumn id={uuidv4()} handlePostitPutted={this.handlePostitPutted} canPut={false} handleMove={this.handleMove} title="0"/>]
    };
  }

  updateColumnList = (postitListJson) => {
    postitListJson.forEach(element => {
      console.log(this.state.columns);
      this.setState({columns:[...this.state.columns, <KanbanColumn id={element.id} title={element.titre} max={element.max_tache} handlePostitPutted={this.handlePostitPutted} 
        canPut={false} handleMove={this.handleMove}/>]})
    });
  }
  
  componentDidMount = () => {
    // set the ref to the productBacklog
    this.setState({productBacklogRef: this.context});

    const requestOptions = {
      method: 'GET', 
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    };
    fetch("http://localhost:3001/colonne/all/" + this.props.id_sprint, requestOptions)
        .then(res => res.json())
        .then(async res => await this.updateColumnList(res))
        .catch(err => err)
  }

 
  
  // Ideally this method should not be used for that
  componentDidUpdate = () => {
    if(this.state.hasCreatedBacklogFunction === false) {
      // here we add two new functions to the productBacklog in order to call the corresponding methods from the kanban
      // really ugly I know
      this.state.productBacklogRef.current.handleMoveKanban = (component) => {this.handleMove(component)};
      this.state.productBacklogRef.current.handlePutPostitKanban = () => {this.handlePostitPutted()};
      this.setState({hasCreatedBacklogFunction: true});
    }
  }

  addColumn = () => {
    const array = this.state.columns.slice();
    const num = array.length.toString();
    const title = "Titre";
    const id = uuidv4();
    
    const requestOptions = {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    };
    fetch("http://localhost:3001/colonne/new/" + this.props.id_sprint + "/" + id + "/" + title, requestOptions)

    this.setState({columns:[...this.state.columns, <KanbanColumn id={id} handlePostitPutted={this.handlePostitPutted} 
      canPut={false} handleMove={this.handleMove} title={title}/>]})
  }
  
  // If a postit has started to move
  handleMove = (component) => {
    // we inform every column that they can now display a button to put the postit
    this.setState({isMovingPostit: true,
      columns: this.state.columns.map((element) => React.cloneElement(element, {canPut: true, newPostit:<Postit {...component.props}/>}))});
    // we inform the productBacklog too
    this.state.productBacklogRef.current.enableToPutPostit(true, <Postit {...component.props}/>);
  }
  
  // when a column has retrieved the postit that was moving
  handlePostitPutted = () => {
    //we informs every columns
    this.setState({isMovingPostit: false, 
      columns:this.state.columns.map((element) => React.cloneElement(element, {canPut: false, newPostit:null}))});
      // and the productBacklog
      this.state.productBacklogRef.current.enableToPutPostit(false, null);
    }

    // Called when the button to add a new column is triggered
    handleClick = (event) => {
      event.preventDefault()
      this.addColumn();
    }  
 
  render() {
    return (
      <div>
        {this.state.n}
        <div class="row">
          {this.state.columns.map((element, i) => {
            return <div class="resizeColumnKanban">{element}</div>
          })}
        </div>
        <div>
          {this.state.isMovingPostit === false ? // if a postit is currently moving, hide the button
          <button  class="addColumn changeBottomButton" onClick={this.handleClick}>Ajouter colonne</button> // button to add a new column
          :
          null
          }
        </div>
      </div>
      )
  }
}

export default Kanban;