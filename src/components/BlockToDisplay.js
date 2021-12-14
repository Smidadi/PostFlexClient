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
            sprintList: null,
            projectId: null
        };
    }

    getKanban = (kanban) => {
        this.setState({hideSprints: true, hideKanban:false, kanban:kanban})
    }

    getProjectId= (id) => {
        this.setState({hideProjects: true, hideSprints: false, projectId: id})
    }

    backToSprintList = () => {
        this.setState({hideSprints:false, hideKanban:true, kanban:null})
    }

    backToProjectList = () => {
        this.setState({hideSprints:true, hideProjects: false, kanban:null})
    }

    render() {
        return (
            <div class="col-9">
                 <div hidden={!this.state.hideSprints || !this.state.hideProjects}>
                    <button class="backSprintButton" onClick={this.backToSprintList}>
                        <img src="../../back.png" width="30px" height="30px" />
                    </button>
                    Kanban
                    {this.state.kanban}
                </div>
                <div hidden={this.state.hideSprints || !this.state.hideKanban}>
                    <button class="backSprintButton" onClick={this.backToProjectList}>
                        <img src="../../back.png" width="30px" height="30px" />
                    </button>
                    Projet
                    {this.state.hideSprints === false ?
                    <SprintList id_project={this.state.projectId} accessKanban2={this.getKanban} />
                    :
                    null}
                </div>
                <div hidden={this.state.hideProjects}>
                    <ProjectList accessProject={this.getProjectId} />
                </div>
            </div>
        )
    }
}

export default BlockToDisplay;