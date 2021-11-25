import React, { Component } from 'react';

class Authentification extends Component {

  constructor(props) {
    super(props);
    this.state = { userID: 'userID', password: 'password'};
  }

  render() {
    return (
        <div class="col-3 loginColor loginCharacterFont">
            <div class="row idFont">
                <div class="col-4">
                    <div id="id">Identifiant</div> 
                </div>
                <div class="col-8">
                    <input type="text" placeholder={this.state.userID} id="inputLogin"/>
                </div>
            </div>
            <div class="row mdpFont">
                <div class="col-4">
                    <div id="mdp">Mot de passe</div>
                </div>
                <div class="col-8">
                    <input type="text" placeholder={this.state.password} id="inputMdp"/>
                </div>
            </div>
        </div>
    )
  }
}

export default Authentification;