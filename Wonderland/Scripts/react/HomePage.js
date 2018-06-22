import React, { Component } from 'react';
import Header from './HeaderPocetna/HeaderPocetna';
import Post from './Post/Post.jsx';
import { Switch, Route } from 'react-router-dom';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            isMounted: true,
            currentUser: this.props.location.state.detail,
            friendsList: this.props.location.state.friendsL
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
                < Header user={this.state.currentUser} friends={this.state.friendsList}></Header>
                <Route path={`${this.props.match.path}/home`} render={(props) => <Post {...props} text={this.props.RANDOM} imeKorisnika={this.state.currentUser.Name} />} />
                
            </div>
        )
    }
}

export default HomePage;