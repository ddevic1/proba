import React, { Component } from 'react';
import Header from './Header/Heading';
import Register from './Registracija/Register';
import Login from './Login/Login';
import HomePage from './HomePage';
import { Link, Route, Switch } from 'react-router-dom';

class MainPage extends Component {
    constructor(props) {
        super(props);
       
    }
    render() {
        return (
            <div>
                <Header></Header>
                <div className="col-md-6">
                    <Login userList={this.props.userList}></Login>
                </div>
                <div className="col-md-6">
                    <Register></Register>
                </div>
               
            </div>
        )
    }
}

export default MainPage;