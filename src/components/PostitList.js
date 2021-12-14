import React, { Component} from 'react';
import { v4 as uuidv4 } from 'uuid';

import Postit from './Postit';

class PostitList extends Component {

    constructor(props) {
        super(props);
        // initial state, subject to change, first elements only here for test
        this.state = {
            postits: [
                //<Postit id={uuidv4()} onPostitModified={this.onPostitModified} handleMove={this.handleClickMove} 
                  //  title="Title_1" description="Description_1" colors={['green']}/>,
            ],
        }

    }
    
    // add a Postit component to the list and update the count
    addPostit = (id, date, title, description, colors) => {
        const postit = <Postit id={id} onPostitModified={this.onPostitModified} 
            handleMove={this.handleClickMove} title={title} date={date} description={description} colors={colors}/>;
        this.setState({postits: [...this.state.postits, postit]});
    }

    // Called by a postit child when it starts moving
    handleClickMove = (component) => {
        // then we remove the postit currently moving from the list
        this.setState({postits: this.state.postits.filter(element => element.props.id !== component.props.id)});
        this.props.handleMove(component); // call the parent corresponding function
    }

    onPostitModified = (component, title, date, description, colors) => {
        const requestOptions = {
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
        };
        fetch("http://localhost:3001/post_it/change/" + component.props.id + "/titre/" + title, requestOptions);
        fetch("http://localhost:3001/post_it/change/" + component.props.id + "/description/" + description, requestOptions);
        var couleursStr = ",";
        colors.forEach(element => {
            couleursStr += element + ","
        });
        fetch("http://localhost:3001/post_it/change/" + component.props.id + "/couleur/" + couleursStr, requestOptions);
        this.setState({postits: this.state.postits.map(element => element.props.id === component.props.id ? 
            React.cloneElement(element, {title: title, date: date, description: description, colors: colors}) : element)});
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