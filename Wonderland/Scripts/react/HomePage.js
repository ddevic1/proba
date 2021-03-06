﻿import React, { Component } from 'react';
import Header from './HeaderPocetna/HeaderPocetna';
import Post from './AllPosts';
import { Switch, Route } from 'react-router-dom';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isMounted: true,
            currentUser: this.props.location.state.detail,
            friendsList: this.props.location.state.friendsL,
            posts: []
        });
       
        console.log({ "HomePage": this.state });
       
    }
   
    componentDidMount() {
      
        this.setState({
            isMounted: true,
            currentUser: this.props.location.state.detail,
            friendsList: this.props.location.state.friendsL
        });


        console.log({ "HomePageCDM": this.state });
    }
  
    render() {
        console.log({ "RenderHomePage": this.state });
        return (
            <div>
                < Header user={this.state.currentUser} friends={this.props.location.state.friendsL} users={this.props.location.state.allUsers}></Header>
                <Route path={`${this.props.match.path}/home`} render={(props) => <Post {...props} users={this.props.location.state.allUsers} text={this.props.RANDOM} imeKorisnika={this.state.currentUser.Name} user={this.state.currentUser} />} />
                
            </div>
        )
    }
}

export default HomePage;