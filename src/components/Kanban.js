import React, { Component } from 'react';
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
      columns: [<KanbanColumn handlePostitPutted={this.handlePostitPutted} canPut={false} handleMove={this.handleMove} title="0"/>]
    };
  }
  
  componentDidMount() {
    // set the ref to the productBacklog
    this.setState({productBacklogRef: this.context});
  }
  
  // Ideally this method should not be used for that
  componentDidUpdate() {
    if(this.state.hasCreatedBacklogFunction === false) {
      // here we add two new functions to the productBacklog in order to call the corresponding methods from the kanban
      // really ugly I know
      this.state.productBacklogRef.current.handleMoveKanban = (component) => {this.handleMove(component)};
      this.state.productBacklogRef.current.handlePutPostitKanban = () => {this.handlePostitPutted()};
      this.setState({hasCreatedBacklogFunction: true});
    }
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
      const array = this.state.columns.slice()
      const id = array.length.toString()
      this.setState({columns:[...this.state.columns, <KanbanColumn handlePostitPutted={this.handlePostitPutted} canPut={false} handleMove={this.handleMove} title={id}/>]})
    }  
 
  render() {
    return (
      <div>
        <div class="row">
          {this.state.columns.map((element, i) => {
            return <div class="col resizeSprint">{element}</div>
          })}
        </div>
        <div>
          {this.state.isMovingPostit === false ? // if a postit is currently moving, hide the button
          <button onClick={this.handleClick}>+</button> // button to add a new column
          :
          null
          }
        </div>
      </div>
      )
  }
}

export default Kanban;