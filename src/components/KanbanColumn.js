import React, { Component } from 'react';
import PostitList from './PostitList';

class KanbanColumn extends Component {

  constructor(props) {
    super(props);
    this.state = { title: '0', 
                    max: 1000, 
                  };

    this.postitListRef = React.createRef(); // will be a ref to an instance of a component
  }

  setTitle(title) {
      this.setState({title: title});
  }
  setMax(max) {
      this.setState({max: max});
  }

  // Calling from children when a postit starts moving
  handleMove = (component) => {
    this.props.handleMove(component); // informs the kanban
  }

  // Calling when the button to put the postit currently moving is triggered
  handlePutPostit = () => {
    this.postitListRef.current.addPostit(this.props.newPostit.props.id, this.props.newPostit.props.title, 
      this.props.newPostit.props.description, this.props.newPostit.props.colors);
    this.props.handlePostitPutted(); // informs the kanban
  }

  render() {

      return (
      <div class="col-2 column">
          {this.props.canPut === true ? // Is a postit from any column currently moving ?
          <button onClick={this.handlePutPostit}>Poser</button> // If yes, display a button to put the postit here
          :
          null}
          <div class="row placeInfos justify-content-center">
              <h5>{this.props.title}</h5>
          </div>
          <PostitList ref={this.postitListRef} handleMove={this.handleMove}/>
          
      </div>
          
    
    )
  }
}

export default KanbanColumn;