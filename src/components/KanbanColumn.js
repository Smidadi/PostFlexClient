import React, { Component } from 'react';
import PostitList from './PostitList';

class KanbanColumn extends Component {

  constructor(props) {
    super(props);
    this.state = { title: '0', 
                    max: 1000, 
                  };

    this.postitListRef = React.createRef(); // will be a ref to an instance of a component

    this.addPostit = this.addPostit.bind(this);
  }

  setTitle(title) {
      this.setState({title: title});
  }

  setMax(max) {
      this.setState({max: max});
  }

  /* call the function addPostit from the instance of PostitList
  */
  addPostit() {
    this.postitListRef.current.addPostit();
  }

  render() {

      return (
      <div class="col-2 column">
          <div class="row placeInfos justify-content-center">
              <h5>{this.props.title}</h5>
          </div>
          <PostitList ref={this.postitListRef} />
      </div>
          
    
    )
  }
}

export default KanbanColumn;