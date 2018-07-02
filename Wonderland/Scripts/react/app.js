import React from 'react';
import ReactDOM from 'react-dom';
import Index from './Index';
import { Router, Route, Link, HashRouter } from 'react-router-dom';
import { IndexRoute } from 'react-router';
import history from './history';
import Post from '../react/ShowPost/ShowPost';
/*
var user;
$.get('/default/GetPosts', function (data) {
    user = data[2];
    console.log(user);
    ReactDOM.render(
        <Router history={history}>
            <Post post={user} />
        </Router>,
        document.getElementById('content'));
});
*/

ReactDOM.render(
    <Router history={history}>
        <Index />
    </Router>,
    document.getElementById('content'));