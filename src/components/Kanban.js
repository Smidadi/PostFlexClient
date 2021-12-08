import React, { Component } from 'react';
import PostitList from './PostitList';

class Kanban extends Component {

  constructor(props) {
    super(props);
    this.state = {
      columns: [<KanbanColumn title="0"/>]
    };
    this.postitListRef = React.createRef();
  }
 
  handleClick = (event) => {
    event.preventDefault()
    const array = this.state.columns.slice()
    const id = array.length.toString()
    this.setState({columns:[...this.state.columns, <KanbanColumn title={id}/>]})
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
          <button onClick={this.handleClick}>
            +
          </button>
        </div>
      </div>
      )
  }
}

export default Kanban;