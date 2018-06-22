import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import MainPage from './MainPage';
import HomePage from './HomePage';


class Index extends React.Component {

    constructor(props) {
        super(props); 
        
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
            
        }.bind(this));

    }
    render() {
       
        var TEXT = [
            "What is your current location? ",
            "Share photos with followers!",
            "What is your current mood?",
            "What is the weather like?"
        ];

        var id = Math.floor(Math.random() * 4);
        var random = (TEXT[id]);


       
        return (

            <div>

                <Route exact path="/" render={(props) => <MainPage {...props} userList={this.state.users} />} />
                <Route path="/user" render={(props) => <HomePage {...props} RANDOM={random} userList={this.state.users} />} />
            </div>
        )
    }
}

Index.displayName = "Index";
export default Index;