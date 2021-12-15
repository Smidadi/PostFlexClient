import React, { Component } from 'react';
class MainInfosBar extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      title: 'Titre',
      titleModifying: false,
      titleInput: '',
      date: "Date",
      dateModifying: false,
      dateInput: ''
    };
  }
        
  isDate = (date) => {
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
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

  handleDateModify = () => {
    this.setState({dateModifying: true})
  }

  handleDateSubmit = (event) => {
    event.preventDefault()
    const date = this.state.dateInput
    if(!this.isDate(date))
      alert("Ce n'est pas le bon format. Essayez MM/JJ/AAAA")
    else
      this.setState({date: date, dateModifying: false, dateInput: ''})
  }

  handleDateChange = (event) => {
    const value = event.currentTarget.value
    this.setState({dateInput: value})
  }

  render() {
    return (
        <div class="col-9 headSprint">
            <h3 class="siteTitle">
              POSTFLEX
            </h3>
            {this.props.isProjectOpen === true && this.props.isConnected ?
                <div class="row infoSprint characterFont"> 
                  <div class="col-6">
                      <div class="row textColor" id="title" hidden={this.state.titleModifying}>
                          {this.state.title}
                          <button class="modifyMainBarInfos inverseColor" onClick={this.handleTitleModify}><img src="../../pen.png" width="30px" /></button>
                      </div>
                          <form hidden={!this.state.titleModifying} onSubmit={this.handleTitleSubmit}>
                            <input value={this.state.titleInput} onChange={this.handleTitleChange} type="text" placeholder={this.state.title} id="textMainBarInfos"></input>
                            <button class="confirmMainBarInfos modifyMainBarInfos inverseColor"><img src="../../check.png" width="30px" /></button>
                          </form>
                  </div>
                  <div class="col-6">
                      <div class="row textColor" id="date" hidden={this.state.dateModifying}>
                          {this.state.date}
                          <button class="modifyMainBarInfos inverseColor" onClick={this.handleDateModify}><img src="../../pen.png" width="30px" /></button>
                      </div>
                          <form hidden={!this.state.dateModifying} onSubmit={this.handleDateSubmit}>
                            <input value={this.state.dateInput} onChange={this.handleDateChange} type="text" placeholder={this.state.date} id="textMainBarInfos"></input>
                            <button class="confirmMainBarInfos modifyMainBarInfos inverseColor"><img src="../../check.png" width="30px" /></button>
                          </form>
                  </div>
                </div>
                :
                null}
        </div>
    )
  }
}

export default MainInfosBar;