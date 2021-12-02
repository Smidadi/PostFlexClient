import React, { Component, } from 'react';
import Select from "react-select";

import PostitList from './PostitList';


class ProductBacklog extends Component {

    constructor(props) {
        super(props);
        this.state = { title: 'Product Backlog', 
                        max: 1000, 
                        isAddingPostit: false, 
                        newPostitTitle: '', 
                        newPostitDescription: '',
                        newPostitColors: [],
                        colorOptions: [ //options for postit types / colors
                            { label: "Front", value: "green", color: "green" },
                            { label: "Back", value: "yellow", color: "yellow" },
                            { label: "BDD", value: "red", color: "red" }
                          ],
                        colorStyles: { //Colors for multiSelect options
                            option: (styles, { data }) => ({
                                    ...styles,
                                    backgroundColor: data.color,
                                }),
                            multiValue: (styles, { data }) => ({
                                    ...styles,
                                    backgroundColor: data.color,
                                }),
                        }};

        this.postitListRef = React.createRef(); // will be a ref to an instance of a component

        this.addPostit = this.addPostit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleMultiChange = this.handleMultiChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        this.setState({isAddingPostit: true});
    }
    
    handleChange(event) {   
        const name = event.target.name; 
        this.setState({[name]: event.target.value});  
    }

    handleMultiChange(option) {
        this.setState({newPostitColors: option.map(o => o.value)} );
    }

    handleSubmit(event) {
        this.setState({isAddingPostit: false, newPostitTitle: '', newPostitDescription: '',});
        this.postitListRef.current.addPostit(this.state.newPostitTitle, this.state.newPostitDescription, this.state.newPostitColors);
    }

    render() {

        return (
        <div class="col-2 column">
            <div class="row placeInfos justify-content-center">
                <h5>{this.state.title}</h5>
            </div>
            <PostitList ref={this.postitListRef} />
           
            <div class="row placeInfos justify-content-center">
                {this.state.isAddingPostit == false ? // are we doing the add of another postit ?
                    <button onClick={this.addPostit}>Ajouter postit</button> // if not, display a button to create a form
                    : // else display the form to create the postit
                    <form onSubmit={this.handleSubmit}> 
                        <label>
                            <input autoFocus name="newPostitTitle" type="text" value={this.state.newPostitTitle} 
                                onChange={this.handleChange} placeholder= "Titre" />  
                            <input name="newPostitDescription" type="text" value={this.state.newPostitDescription} 
                                onChange={this.handleChange} placeholder="Description" />  
                        </label>
                        <Select
                            isMulti
                            name="colors"
                            options={this.state.colorOptions}
                            styles={this.state.colorStyles}
                            onChange={this.handleMultiChange}
                        />
                        <input type="submit" value="Ajouter postit" />
                    </form>}   
            </div>
        </div>
            
       
        )
    }
}

export default ProductBacklog;