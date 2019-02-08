import React from 'react';
import { withRouter } from 'react-router-dom';

import Header from './../components/Header';
import Footer from './../components/Footer';

class Login extends React.Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: ''
        }
    }
    _handleSubmit = (event) => {
        console.log('aye aye captain');
        console.log(this.state.email + " " + this.state.password)
        event.preventDefault();
        fetch('http://localhost:3030/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: this.state.email, password: this.state.password})
        }).then(response => {
            return response.json();
        }).then(obj => {
            console.log(obj.status);
            if(obj.status === 302) {
                console.log("You are signed in");
                this.props.history.push('/home');
            }
        });
    }
    _handleUsernameChange = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    _handlePasswordChange = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    render(){
        return(
            <div>
                <Header/>
                <form onSubmit={this._handleSubmit}>
                    Username<input type="text" onChange={this._handleUsernameChange}/>
                    Password<input type="password" onChange={this._handlePasswordChange}/>
                    <input type="submit" value="Submit" />
                </form>
                <Footer/>
            </div>
        )
    }
}
export default withRouter(Login);