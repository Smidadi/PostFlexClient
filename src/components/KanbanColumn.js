import React, { Component } from 'react';
import PostitList from './PostitList';

class KanbanColumn extends Component {

  constructor(props) {
    super(props);
      this.state = {  title: 'Titre',
                      titleModifying: false,
                      titleInput: '', 
                      max: 1000, 
                  };

    this.postitListRef = React.createRef(); // will be a ref to an instance of a component
  }

  handleTitleModify = () => {
    this.setState({titleModifying: true})
  }

  handleTitleSubmit = (event) => {
    event.preventDefault()
    const title = this.state.titleInput
    if(title === '')
      alert("Le titre ne peut pas être vide.")
    else if(title.length > 20)
      alert("Le titre ne peut pas faire plus de 20 caractères.")
    else
      this.setState({title: title, titleModifying: false, titleInput: ''})
  }

  handleTitleChange = (event) => {
    const value = event.currentTarget.value
    this.setState({titleInput: value})
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
      <div class="col-12 column">
          {this.props.canPut === true ? // Is a postit from any column currently moving ?
          <button class="settingsPostit" onClick={this.handlePutPostit}>Poser</button> // If yes, display a button to put the postit here
          :
          null}
          <div class="row resizeTitlePostit" id="title" hidden={this.state.titleModifying}>
              {this.state.title}
              <button class="modifyMainBarInfos" onClick={this.handleTitleModify}><img src="../../pen.png" width="15px" /></button>
          </div>
              <form hidden={!this.state.titleModifying} onSubmit={this.handleTitleSubmit}>
                <input value={this.state.titleInput} onChange={this.handleTitleChange} type="text" placeholder={this.state.title} id="textMainBarInfos"></input>
                <button class="resizeTitlePostit confirmMainBarInfos modifyMainBarInfos"><img src="../../check.png" width="30px" /></button>
              </form>
          <PostitList ref={this.postitListRef} handleMove={this.handleMove}/>
          
      </div>
          
    
    )
  }
}

export default KanbanColumn;