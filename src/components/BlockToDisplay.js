import React, { Component } from 'react';
import SprintList from './SprintList';

class BlockToDisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hideSprints: false,
            kanban: null
        };
    }

    toShow = (blockToShow) => {
        return blockToShow !== this.state.block;
    }

    getKanban = (kanban) => {
        this.setState({hideSprints: true, kanban:kanban})
    }

    backToSprintList = () => {
        this.setState({hideSprints:false, kanban:null})
    }

    render() {
        return (
            <div class="col-9">
                <div hidden={this.state.hideSprints}>
                    <SprintList accessKanban2={this.getKanban} />
                </div>
                    <div hidden={!this.state.hideSprints}>
                    <button class="backButton" onClick={this.backToSprintList}>
                        <img src="../../back.png" width="30px" height="30px" />
                    </button>
                    {this.state.kanban}
                </div>
            </div>
        )
    }
}

export default BlockToDisplay;