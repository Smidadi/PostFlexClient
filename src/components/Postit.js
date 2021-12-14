import React, {Component} from 'react';
import Select from "react-select";

class Postit extends Component {

    constructor(props) {
        super(props);
       
        this.state = { isModifyingPostit: false, 
                        newTitle: this.props.title, 
                        newDescription: this.props.description,
                        newColors: this.props.colors,
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
    }

    modifyPostit = () => {
        this.setState({isModifyingPostit: true});
    }
    modifyCancel = () => {
        this.setState({isModifyingPostit: false, newTitle: this.props.title, newDescription: this.props.description, newColors: this.props.colors});
    }
    handleChange = (event) => {   
        const name = event.target.name; 
        this.setState({[name]: event.target.value});  
    }
    handleMultiChange = (option) => {
        this.setState({newColors: option.map(o => o.value)} );
    }
    handleSubmit = (event) => {
        this.setState({isModifyingPostit: false});
        this.props.onPostitModified(this, this.state.newTitle, this.props.date, this.state.newDescription, this.state.newColors);
    }
    

    // Called when the button to move the postit is triggered
    onClickMove = (event) => {
        this.props.handleMove(this);
    }

    onPostitDeleted = () => {
        this.props.onPostitDeleted(this.props.id)
    }

    render() {
        return (
            <div class="col-12 postitStyle">
                    {this.state.isModifyingPostit === false ? // are we modifying the postit ?
                        <div>
                            <div class="row replaceTagColor">
                                {/* List of rectangles of chosen colors */}
                                {this.props.colors != null ? this.props.colors.map((color, index) => 
                                <div class="tagColor" key={index} style={{backgroundColor: color}}>
                                </div>
                                ) : null}
                            </div>
                            
                            <h6>
                                {this.props.title !== '' ? this.props.title : "Titre"}
                            </h6>
                            <div>
                                {this.props.description !== '' ? this.props.description : "Description"}
                            </div>
                            <div>
                                {this.props.date}
                            </div> 

                            <div class="row">  
                                <div class="col-6">   
                                    <button class="settingsPostit" onClick={this.onClickMove}>Déplacer</button>{/* button to move a postit */}
                               </div> 
                                <div class="col-6">   
                                    <button class="settingsPostit" onClick={this.modifyPostit}>Modifier</button> {/* button to modify the postit */}
                               </div> 
                               <div class="col">   
                                    <button class="settingsPostit resizeSettingsPostit" onClick={this.onPostitDeleted}>Supprimer</button> {/* button to delete the postit */}
                               </div> 
                            </div>
                        </div>

                        : // else display the form to modify the postit
                        <div class="row">
                            <form class="formSettingsPostit" onSubmit={this.handleSubmit}> 
                                <label>
                                    <input class="formLabelSettingsSize" autoFocus name="newTitle" type="text" value={this.state.newTitle} 
                                        onChange={this.handleChange} placeholder= "Titre" />  
                                    <input class="formLabelSettingsSize" name="newDescription" type="text" value={this.state.newDescription} 
                                        onChange={this.handleChange} placeholder="Description" />  
                                </label>
                                <Select
                                    isMulti
                                    defaultValue={this.state.colorOptions.filter(element => this.props.colors.includes(element.value))}
                                    name="colors"
                                    options={this.state.colorOptions}
                                    styles={this.state.colorStyles}
                                    onChange={this.handleMultiChange}
                                    placeholder="Couleur"
                                />
                                <div class="row"> 
                                    <div class="col-6">
                                        <input id="modifyPostitStyle" type="submit" value="Valider" />
                                    </div>
                                    <div class="col-6">
                                        <button id="modifyPostitStyle" onClick={this.modifyCancel}>Annuler</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    }
            </div>
        )
    }

}

export default Postit;