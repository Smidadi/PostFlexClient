import React, { Component, useState, useEffect } from 'react';

import Postit from './Postit';

class PostitList extends Component {

    constructor(props) {
        super(props);
        // initial state, subject to change, first elements only here for test
        this.state = {
            count: 3,
            postits: [
                <Postit title="postit_title_1"/>,
                <Postit title="postit_title_2"/>,
                <Postit title="postit_title_3"/>
            ]
        }
    }

    // add a Postit component to the list and update the count
    addPostit() {
        this.state.postits.push(<Postit title={"postit_title_" + ++this.state.count} />);
        this.forceUpdate(); // force the render of the component again cause we updated the list
    }
    
    render() {

        return (
            <div>
                {this.state.postits.map(component => component)} {/* get all the components from the list */}
            </div>
        )
    }
}

export default PostitList;