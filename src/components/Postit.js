import React, {Component} from 'react';

class Postit extends Component {

    constructor(props) {
        super(props);
        var today = new Date(),
            date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        this.state = {date: date};
    }

    // Called when the button to move the postit is triggered
    onClickMove = (event) => {
        this.props.handleMove(this);
    }

    render() {
        return (
            <div class="col-12 postitStyle">
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
                        {this.state.date}
                    </div> 
                    <button onClick={this.onClickMove}>Déplacer</button>{/* button to move a postit */}
            </div>
        )
    }

}

export default Postit;