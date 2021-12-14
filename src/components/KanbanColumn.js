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

  componentDidMount = () => {
    console.log("GET");
    fetch("http://localhost:3000/post_it/all")
        .then(res => res.json)
        .then(res => this.updatePostitList(res))
        .catch(err => err)
  }

  updatePostitList = (postitListJson) => {
    console.log("POSTIT LIST : " + postitListJson)
  }

  addPostit = (id, date, title, description, colors) => {

    var couleursStr = "";
    colors.forEach(element => {
      couleursStr += element + ","
    });

    const requestOptions = {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
    };
    fetch("http://localhost:3000/post_it/new/" + id + "/" + date + "/1/" + title + "/" + description + "/" + "green", requestOptions)
      .then(response => response.json())
      .then(data => console.log("RESPONSE" + data))
      .catch(err => err);
    this.postitListRef.current.addPostit(id, date, title, description, colors);
  }

  // Modif title
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
    this.addPostit(this.props.newPostit.props.id, this.props.newPostit.props.date, this.props.newPostit.props.title, 
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
          <div class="row" id="title" hidden={this.state.titleModifying}>
              {this.state.title}
              <button class="modifyMainBarInfos" onClick={this.handleTitleModify}><img src="../../pen.png" width="30px" /></button>
          </div>
              <form hidden={!this.state.titleModifying} onSubmit={this.handleTitleSubmit}>
                <input value={this.state.titleInput} onChange={this.handleTitleChange} type="text" placeholder={this.state.title} id="textMainBarInfos"></input>
                <button class="confirmMainBarInfos modifyMainBarInfos"><img src="../../check.png" width="30px" /></button>
              </form>
          <PostitList ref={this.postitListRef} handleMove={this.handleMove}/>
          
      </div>
          
    
    )
  }
}

export default KanbanColumn;