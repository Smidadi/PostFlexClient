import React, { Component } from 'react';
import SprintList from './SprintList';
import ProjectList from './ProjectList';

class BlockToDisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hideProjects: false,
            hideSprints: true,
            hideKanban: true,
            kanban: null,
            sprintList: null
        };
    }

    getKanban = (kanban) => {
        this.setState({hideSprints: true, hideKanban:false, kanban:kanban})
    }

    getSprintList = (sprintList) => {
        this.setState({hideProjects: true, hideSprints: false, sprintList: sprintList})
    }

    backToSprintList = () => {
        this.setState({hideSprints:false, hideKanban:true, kanban:null})
    }

    render() {
        return (
            <div class="col-9">
                <div hidden={this.state.hideProjects}>
                    <ProjectList accessProject={this.getSprintList} />
                </div>
                <div hidden={this.state.hideSprints}>
                    <SprintList accessKanban2={this.getKanban} />
                </div>
                 <div hidden={!this.state.hideSprints || !this.state.hideProjects}>
                    <button class="backSprintButton" onClick={this.backToSprintList}>
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