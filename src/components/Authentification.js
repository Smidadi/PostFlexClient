import React, { Component } from 'react';
import myDB from './../users.json'
class Authentification extends Component {

  constructor(props) {
    super(props);
    this.state = {
        idInput:'',
        passwordInput:'',
        signup: false,
        connected: false,
        userConnected: ''
    };
  }

  handleAuthentificationSubmit = (event) => {
    event.preventDefault()
    let connect = false
    myDB.users.forEach(element => {
        if(this.state.idInput === element.id && this.state.passwordInput === element.password)
            connect = true   
    });
        if(connect)
            this.setState({connected:true, userConnected:this.state.idInput})
        else
            alert("Vérifiez votre identifiant ou votre mot de passe.")
  }

  handleSignupSubmit = (event) => {
    event.preventDefault()
    this.setState({idInput: '', passwordInput: '', signup:true})
  }

  handleDisconnectSubmit = (event) => {
    event.preventDefault()
    this.setState({idInput:'', passwordInput:'', signup: false, connected: false, userConnected: ''})
  }

  handleBackSubmit = (event) => {
    event.preventDefault()
    this.setState({idInput:'', passwordInput:'', signup: false, connected: false, userConnected: ''})
  }

  handleIdChange = (event) => {
    const value = event.currentTarget.value
    this.setState({idInput: value})
  }

  handlePasswordChange = (event) => {
    const value = event.currentTarget.value
    this.setState({passwordInput: value})
  }

  handleAddUserSubmit = (event) => {
    event.preventDefault()
    let userAllowed = true
    myDB.users.forEach((element) => {
        if(this.state.idInput === element.id){
            alert("Cet utilisateur existe déjà.")
            userAllowed = false
        }
    });
    if(userAllowed){
        if(this.state.passwordInput.length < 6)
            alert("Le mot de passe est trop court, il doit contenir 6 charactères minimum.")
        else{
            myDB.users[myDB.users.length] = {
                "id":this.state.idInput,
                "password":this.state.passwordInput
            }
            this.setState({idInput: '', passwordInput: '', signup:false})
            alert("Votre compte a bien été créé.")
        }
    }
  }

  render() {
    return (
        <div class="col-3 loginColor loginCharacterFont">
            <div class="row idFont" hidden={this.state.connected}>
                <div class="col-4">
                    <div class="row">Identifiant</div> 
                </div>
                <div class="col-8">
                    <input value={this.state.idInput} onChange={this.handleIdChange} type="text" placeholder="Identifiant" id="inputLogin"/>
                </div>
            </div>
            <div class="row mdpFont" hidden={this.state.connected}>
                <div class="col-4">
                    <div class="row">Mot de passe</div>
                </div>
                <div class="col-8">
                    <input value={this.state.passwordInput} onChange={this.handlePasswordChange} type="password" placeholder="Mot de passe" id="inputMdp"/>
                </div>
            </div>
            <div class="row validate" hidden={this.state.connected}>
                <div class="col-6">
                    <button class="allButton connexionButton" onClick={this.handleAuthentificationSubmit} hidden={this.state.signup}>Se connecter</button>
                </div>
                <div class="col-6">
                    <button class="allButton inscriptionButton" onClick={this.handleSignupSubmit} hidden={this.state.signup}>S'inscrire</button>
                </div>
            </div>
            <div class="row" hidden={this.state.connected}>
                <div class="col-6">
                    <button class="allButton confirmButton" onClick={this.handleAddUserSubmit} hidden={!this.state.signup}>Confirmer</button>
                </div>
                <div class="col-6">
                    <button class="allButton backButton" onClick={this.handleBackSubmit} hidden={!this.state.signup}>Retour</button>
                </div>
            </div>
            <div class="row connectedMsg" hidden={!this.state.connected}>
                {this.state.userConnected} est connecté. 
            </div>
            <div class="row" hidden={!this.state.connected}>
                <button class="allButton disconnectButton" onClick={this.handleDisconnectSubmit}>Se déconnecter</button>
                
            </div>
        </div>
    )
  }
}

export default Authentification;