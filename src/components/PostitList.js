import React, { Component, useState, useEffect } from 'react';

import Postit from './Postit';

class PostitList extends Component {

    constructor(props) {
        super(props);
        // initial state, subject to change, first elements only here for test
        this.state = {
            postits: [
                <Postit title="Title_1" description="Description_1" colors={["green"]}/>
            ]
        }
    }

    // add a Postit component to the list and update the count
    addPostit(title, description, colors) {
        this.setState({postits: [...this.state.postits, <Postit title={title} description={description} colors={colors}/>]});
    }
    
    render() {

        return (
            <div>
                {this.state.postits.map((component, index) => <li key={index}>{component}</li>)} {/* get all the components from the list */}
            </div>
        )
    }
}

export default PostitList;