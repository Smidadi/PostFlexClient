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
            alert("Wrong password.")
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
            alert("This user already exists.")
            userAllowed = false
        }
    });
    if(userAllowed){
        if(this.state.passwordInput.length < 6)
            alert("Password too short, need 6 characters minimum.")
        else{
            myDB.users[myDB.users.length] = {
                "id":this.state.idInput,
                "password":this.state.passwordInput
            }
            this.setState({idInput: '', passwordInput: '', signup:false})
        }
    }
  }

  render() {
    return (
        <div class="col-3 loginColor loginCharacterFont">
            <div class="row idFont" hidden={this.state.connected}>
                <div class="col-4">
                    <div id="id">Username</div> 
                </div>
                <div class="col-8">
                    <input value={this.state.idInput} onChange={this.handleIdChange} type="text" placeholder="username" id="inputLogin"/>
                </div>
            </div>
            <div class="row mdpFont" hidden={this.state.connected}>
                <div class="col-4">
                    <div id="mdp">Password</div>
                </div>
                <div class="col-8">
                    <input value={this.state.passwordInput} onChange={this.handlePasswordChange} type="password" placeholder="password" id="inputMdp"/>
                </div>
            </div>
            <div class="row validate" hidden={this.state.connected}>
                <div class="col-4">
                    <button class="signButton" onClick={this.handleAuthentificationSubmit} hidden={this.state.signup}>Sign in</button>
                </div>
                <div class="col-4 text-right">
                    <button onClick={this.handleSignupSubmit} hidden={this.state.signup}>Sign up</button>
                </div>
            </div>
            <div class="row" hidden={this.state.connected}>
                <div class="col text-center">
                    <button onClick={this.handleAddUserSubmit} hidden={!this.state.signup}>Confirm</button>
                </div>
                <div class="col text-center">
                    <button onClick={this.handleBackSubmit} hidden={!this.state.signup}>Back</button>
                </div>
            </div>
            <div class="row" hidden={!this.state.connected}>
                <div class="text-center">
                    {this.state.userConnected} is connected
                </div>
            </div>
            <div class="row" hidden={!this.state.connected}>
                <div class="text-center">
                    <button onClick={this.handleDisconnectSubmit}>Disconnect</button>
                </div>
            </div>
        </div>
    )
  }
}

export default Authentification;