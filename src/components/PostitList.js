import React, { Component} from 'react';

import Postit from './Postit';

class PostitList extends Component {

    constructor(props) {
        super(props);
        // initial state, subject to change, first elements only here for test
        this.state = {
            postits: [
                //<Postit id={uuidv4()} handleMove={this.handleClickMove} title="Title_1" description="Description_1" colors={['green']}/>
            ],
        }

    }

    // add a Postit component to the list and update the count
    addPostit(id, title, description, colors) {
        const postit = <Postit id={id} handleMove={this.handleClickMove} title={title} description={description} colors={colors}/>;
        this.setState({postits: [...this.state.postits, postit]});
    }

    // Called by a postit child when it starts moving
    handleClickMove = (component) => {
        this.props.handleMove(component); // call the parent corresponding function
        // then we remove the postit currently moving from the list
        this.setState({postits: this.state.postits.filter(element => element.props.id !== component.props.id)})
    }
    
    render() {

        return (
            <div>
                {this.state.postits.map((component, index) => <div key={index}>{component}</div>)} {/* get all the components from the list */}
            </div>
        )
    }
}

export default PostitList;