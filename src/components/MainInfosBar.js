import React, { Component } from 'react';
class MainInfosBar extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      title: 'title',
      titleModifying: false,
      titleInput: '',
      date: "date",
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
      alert("You can not put an empty title.")
    else if(title > 20)
      alert("Title max length is 20 caracters.")
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
      alert("This is not a date format. Try MM/JJ/YYYY")
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
            <div class="row infoSprint characterFont"> 
                <div class="col-6">
                    <div class="row" id="title" hidden={this.state.titleModifying}>
                        {this.state.title}
                        <button onClick={this.handleTitleModify}>Modify</button>
                    </div>
                        <form hidden={!this.state.titleModifying} onSubmit={this.handleTitleSubmit}>
                          <input value={this.state.titleInput} onChange={this.handleTitleChange} type="text" placeholder={this.state.title}></input>
                          <button>Confirmer</button>
                        </form>
                </div>
                <div class="col-6">
                    <div class="row" id="date" hidden={this.state.dateModifying}>
                        {this.state.date}
                        <button onClick={this.handleDateModify}>Modify</button>
                    </div>
                        <form hidden={!this.state.dateModifying} onSubmit={this.handleDateSubmit}>
                          <input value={this.state.dateInput} onChange={this.handleDateChange} type="text" placeholder={this.state.date}></input>
                          <button>Confirmer</button>
                        </form>
                </div>
            </div>
        </div>
    )
  }
}

export default MainInfosBar;