import React, { Component } from 'react';

import PostitList from './PostitList';


class ProductBacklog extends Component {

    constructor(props) {
        super(props);
        this.state = { title: 'Product Backlog', max: 1000};
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
        <div class="col-3 column">
            <div class="row placeInfos justify-content-center">
              {this.state.title}
            </div>
            <div className="row">
                        <PostitList ref={this.postitListRef} />
                    </div>
            <div class="row placeInfos justify-content-center">
              +{/* button to add a postit */}
                <button onClick={this.addPostit}></button> 
            </div>
        </div>
            
       
        )
    }
}

export default ProductBacklog;