import React, {Component} from 'react';
import Select from "react-select";

class Postit extends Component {

    constructor(props) {
        super(props);
        var today = new Date(),
            date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        this.state = {  date: date, 
                        isModifyingPostit: false, 
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
        this.props.onPostitModified(this, this.state.newTitle, this.state.newDescription, this.state.newColors);
    }
    

    // Called when the button to move the postit is triggered
    onClickMove = (event) => {
        console.log(this.props.title);
        this.props.handleMove(this);
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

                            <button onClick={this.onClickMove}>Déplacer</button>{/* button to move a postit */}
                            
                            <button onClick={this.modifyPostit}>Modifier</button> {/* button to modify the postit */}
                        </div>

                            : // else display the form to modify the postit
                            <form onSubmit={this.handleSubmit}> 
                                <label>
                                    <input class="formLabelsize" autoFocus name="newTitle" type="text" value={this.state.newTitle} 
                                        onChange={this.handleChange} placeholder= "Titre" />  
                                    <input class="formLabelsize" name="newDescription" type="text" value={this.state.newDescription} 
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
                                <input type="submit" value="Valider" />
                                <button onClick={this.modifyCancel}>Annuler</button>
                            </form>
                    }
            </div>
        )
    }

}

export default Postit;