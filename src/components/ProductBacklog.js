import React, { Component, } from 'react';
import Select from "react-select";
import { v4 as uuidv4 } from 'uuid';

import PostitList from './PostitList';


class ProductBacklog extends Component {

    constructor(props) {
        super(props);
        this.state = { title: 'Product Backlog', 
                        max: 1000, 
                        canPut: false,
                        postitToPut: null,
                        isAddingPostit: false, 
                        newPostitTitle: '', 
                        newPostitDescription: '',
                        newPostitColors: [],
                        colorOptions: [ //options for postit types / colors
                            { value: "green", color: "green" },
                            { value: "yellow", color: "yellow" },
                            { value: "red", color: "red" }
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
    }

    componentDidMount = () => {
        const requestOptions = {
            method: 'GET', 
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
        };
        fetch("http://localhost:3001/post_it/all", requestOptions)
            .then(res => res.json())
            .then(res => this.updatePostitList(res))
            .catch(err => err)
    }

    updatePostitList = (postitListJson) => {
        postitListJson.forEach(element => {
            if(element.id_colonne === this.props.id){
                var colors = element.couleur.split(',');
                colors = colors.filter(element => element !== "");
                this.postitListRef.current.addPostit(element.id, element.date_creation, element.titre, element.description, colors);
            }
        });
    }

    // add postit to db
    addPostit = (id, date, title, description, colors) => {

        var couleursStr = ",";
        colors.forEach(element => {
            couleursStr += element + ","
        });

        const requestOptions = {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
        };
        fetch("http://localhost:3001/post_it/new/" + id + "/" + this.props.id + "/" + date + "/" + title + "/" + 111 + "/" + description + "/" + couleursStr, requestOptions)
            .then(response => response.json())
            .then(data => console.log("RESPONSE" + data))
            .catch(err => err);
        this.postitListRef.current.addPostit(id, date, title, description, colors);
    }
    
    //============================
    // Methods to add a new postit 
    setAddingPostit = () => {
        this.setState({isAddingPostit: true});
    }
    handleChange = (event) => {   
        const name = event.target.name; 
        this.setState({[name]: event.target.value});  
    }
    handleMultiChange = (option) => {
        this.setState({newPostitColors: option.map(o => o.value)} );
    }
    handleSubmit = (event) => {
        var today = new Date(), date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        this.addPostit(uuidv4(), date, this.state.newPostitTitle === '' ? "Titre" : this.state.newPostitTitle, 
                                this.state.newPostitDescription === '' ? "Description" : this.state.newPostitDescription, this.state.newPostitColors);
        this.setState({isAddingPostit: false, newPostitTitle: '', newPostitDescription: '', newPostitColors: []});
    }
    modifyCancel = () => {
        this.setState({isAddingPostit: false, newPostitTitle: '', newPostitDescription: '', newPostitColors: []});
    }
    //==============================

    // Calling from children when a postit starts moving
    handleMove = (component) => {
        this.handleMoveKanban(component); // informs the kanban
    }
    handleMoveKanban = (component) => {}
    
    // Calling when the button to put the postit currently moving is triggered
    handlePutPostit = () => {
        this.postitListRef.current.addPostit(this.state.postitToPut.props.id, this.state.postitToPut.props.date, this.state.postitToPut.props.title, 
                this.state.postitToPut.props.description, this.state.postitToPut.props.colors);
        this.handlePutPostitKanban(); // informs the kanban
    }
    handlePutPostitKanban = () => {}

    // The unique kanban call this method when a postit from any kanbanColumn is moving,
    // allowing to put the postit in this column
    enableToPutPostit = (canPut, newPostit) => {
        this.setState({canPut: canPut, postitToPut: newPostit});
    }


    render() {

        return (
        <div class="col-2 column scrollY">
            {this.state.canPut === true ? // Is a postit from any column currently moving ?
            <button class="settingsPostit" onClick={this.handlePutPostit}>Poser</button> // If yes, display a button to put the postit here
            :
            null}

            <div class="row placeInfos justify-content-center">
                <h5>{this.state.title}</h5>
            </div>

            <PostitList handleMove={this.handleMove} ref={this.postitListRef} />
           
            <div class="row">
                {this.state.canPut === false ? 
                    this.state.isAddingPostit === false ? // are we doing the add of another postit ?
                        <button class="addPostitButton" onClick={this.setAddingPostit}>Ajouter postit</button> // if not, display a button to create a form
                        : // else display the form to create the postit
                        <form class="formAddPostit" onSubmit={this.handleSubmit}> 
                            <label>
                                <input class="formLabelsize" autoFocus name="newPostitTitle" type="text" value={this.state.newPostitTitle} 
                                    onChange={this.handleChange} placeholder= "Titre" />  
                                <input class="formLabelsize" name="newPostitDescription" type="text" value={this.state.newPostitDescription} 
                                    onChange={this.handleChange} placeholder="Description" />  
                            </label>
                            <Select
                                isMulti
                                name="colors"
                                options={this.state.colorOptions}
                                styles={this.state.colorStyles}
                                onChange={this.handleMultiChange}
                                placeholder="Couleur"
                                
                            />
                            <input class="addPostitSubmit" type="submit" value="Ajouter postit" />
                            <button class="addPostitSubmit resizeCancelButton" onClick={this.modifyCancel}>Annuler</button>
                        </form>
                    :
                    null
                }   
            </div>
        </div>
        )
    }
}

export default ProductBacklog;