import React, { Component } from 'react';

class MainInfosBar extends Component {

  constructor(props) {
    super(props);
    this.state = { title: 'title', date: 'date'};
    this.handleTitleClick = this.handleTitleClick.bind(this);
    this.handleDateClick = this.handleDateClick.bind(this);
  }

  handleTitleClick() {
    this.setState({title: this.state.title + 'a'})
  }

  handleDateClick() {
    this.setState({date: this.state.date + '1'})
  }

  render() {
    return (
        <div class="col-9 headSprint">
            <div class="row infoSprint characterFont"> 
                <div class="col-6">
                    <div class="row" id="title">
                        {this.state.title} <button onClick={this.handleTitleClick}></button>
                    </div>
                </div>
                <div class="col-6">
                    <div class="row" id="date">
                        {this.state.date} <button onClick={this.handleDateClick}></button>
                    </div>
                </div> 
            </div>
        </div>
    )
  }
}

export default MainInfosBar;