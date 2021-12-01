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
                <div>
                    {this.props.title}
                </div>
                <div>
                    {this.props.description}
                </div>
                <div>
                    {this.state.date}
                </div>  
            </div>
        )
    }

}

export default Postit;