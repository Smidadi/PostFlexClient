import React, { Component } from 'react';
import SprintList from './SprintList';
import ProjectList from './ProjectList';

class BlockToDisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hideProjects: true,
            hideSprints: false,
            hideKanban: true,
            kanban: null
        };
    }

    getKanban = (kanban) => {
        this.setState({hideSprints: true, hideKanban:false, kanban:kanban})
    }

    backToSprintList = () => {
        this.setState({hideSprints:false, hideKanban:true, kanban:null})
    }

    render() {
        return (
            <div class="col-9">
                <div hidden={this.state.hideProjects}>
                    <ProjectList />
                </div>
                <div hidden={this.state.hideSprints}>
                    <SprintList accessKanban2={this.getKanban} />
                </div>
                    <div hidden={this.state.hideKanban}>
                    <button class="backButton" onClick={this.backToSprintList}>
                        <img src="../../back.png" width="30px" height="30px" />
                    </button>
                    kanban
                    {this.state.kanban}
                </div>
            </div>
        )
    }
}

export default BlockToDisplay;