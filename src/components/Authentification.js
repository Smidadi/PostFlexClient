import React, { Component } from 'react';
import myDB from './../users.json'
class Authentification extends Component {

  constructor(props) {
    super(props);
    this.state = {
        idInput:'',
        passwordInput:'',
    };
  }

  handleAuthentificationSubmit = (event) => {
    event.preventDefault()
    myDB.users.forEach(element => {
        if(this.state.idInput === element.id && this.state.passwordInput === element.password)
            console.log("CONNECTED")
        else
            alert("Wrong password.")
    });
  }

  handleIdChange = (event) => {
    const value = event.currentTarget.value
    this.setState({idInput: value})
  }

  handlePasswordChange = (event) => {
    const value = event.currentTarget.value
    this.setState({passwordInput: value})
  }

  render() {
    return (
        <div class="col-3 loginColor loginCharacterFont">
            <div class="row idFont">
                <div class="col-4">
                    <div id="id">Identifiant</div> 
                </div>
                <div class="col-8">
                    <input value={this.state.idInput} onChange={this.handleIdChange} type="text" placeholder="username" id="inputLogin"/>
                </div>
            </div>
            <div class="row mdpFont">
                <div class="col-4">
                    <div id="mdp">Mot de passe</div>
                </div>
                <div class="col-8">
                    <input value={this.state.passwordInput} onChange={this.handlePasswordChange} type="password" placeholder="password" id="inputMdp"/>
                </div>
            </div>
            <div class="row validate">
                <div class="col">
                    <div class="text-center align-middle" id="valid">
                        <button onClick={this.handleAuthentificationSubmit}>Connexion</button>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

export default Authentification;