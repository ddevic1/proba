import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, Route, Switch, Router } from 'react-router-dom';
import NewPost from './Post/Post.jsx';
import Post from './ShowPost/ShowPost';

class AllPosts extends Component {
    constructor(props) {
        super(props);
        console.log("konstruktor");
        this.state = {
            postNodes: []
        }

        this.refreshPosts = this.refreshPosts.bind(this);

        $.get('/posts' , function (data) {
             var postNodesTmp = data.map((element) => {
                return (

                    <Post post={element} >

                    </Post>
                );
            });
            this.setState({
                postNodes: postNodesTmp
            });
          
        }.bind(this));

    }

    componentDidMount() {
        this.refreshPosts();
        setInterval(this.refreshPosts, 180000);
    }

    refreshPosts() {

        console.log("Refresh Posts");
        this.setState({
            postNodes: []
        });

        $.get('/posts', function (data) {
            var postNodesTmp = data.map((element) => {
              
                return (

                    <Post post={element} >

                    </Post>
                );
            });
            this.setState({
                postNodes: postNodesTmp
            });
           
            
        }.bind(this));
    }

    render() {
        return (
            <div>
                <NewPost text={this.props.text} imeKorisnika={this.props.imeKorisnika} user={this.props.user} onPostPosted={this.refreshPosts} allUsers={this.props.users}></NewPost>
                {this.state.postNodes}
               
            </div>

        )
    }

}

export default AllPosts;