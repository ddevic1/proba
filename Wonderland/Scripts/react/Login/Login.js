import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HomePage from '../HomePage';
import { Link, Route, Switch, Router } from 'react-router-dom';
import history from '../history';

class Login extends Component {
    constructor(props) {

        super(props);

        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
       
        this.state = {
            users: [],
            friends: []
        }

    }
    componentDidMount() {
        $.get('/default/DisplayUsers', function (data) {
            this.setState({
                users: data
            });
           // console.log(this.state.users);
        }.bind(this));

        //  console.log({ "ComponentDidMount": this.state });
    }

    handleLoginSubmit(e) {
        e.preventDefault();
       
        for (var i = 0; i < this.state.users.length; i++) {
            if ((this.state.users[i].Email === this.refs.email.value || this.state.users[i].Name === this.refs.email.value) && this.state.users[i].Password === this.refs.pass.value) {
                console.log(this.state.users[i]);
               $.get('/friends/' + this.state.users[i].UserId, function (data) {
                    this.setState({
                        friends: data
                    });
                     console.log({ "friendsLogin": this.state.friends });
                     history.push('/user/home', { detail: this.state.users[i], friendsL: data });
                }.bind(this));
               
                break;
               
            }
        }
        
    }


    
    render() {
        return (
                <div class="row">
                    <div id="formadiv1" class="col-md-6 text-center">

                    <form action="/" onSubmit={(e) => this.handleLoginSubmit(e)} class="loginForm">
                        <div class="input-group">
                            <input type="text" ref="email" id="e-mail1" class="form-control shadow" placeholder="E-mail"  />
                            <input type="password" ref="pass" id="pass1" class="form-control shadow" placeholder="Password" />
                            <input type="submit" id="submit1" class="form-control shadow" value="Prijavi se"  />
                            </div>
                        </form>

                </div>
                  </div>
            
        )
    }

}

export default Login;