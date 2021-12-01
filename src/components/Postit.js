import React, {Component} from 'react';

class Postit extends Component {

    constructor(props) {
        super(props);
        var today = new Date(),
            date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        this.state = {date: date};
    }


    render() {
        return (
            <div>
                {/* List of rectangles of chosen colors */}
                {this.props.colors != null ? this.props.colors.map((color, index) => 
                <div key={index} style={{ display: "flex",  width: "50x", 
                    height: "10px", backgroundColor: color}}>
                </div>
                ) : null}
                
                <div>
                    {this.props.title != '' ? this.props.title : "Titre"}
                </div>
                <div>
                    {this.props.description != '' ? this.props.description : "Description"}
                </div>
                <div>
                    {this.state.date}
                </div>  
            </div>
        )
    }

}

export default Postit;