import React from 'react';
import ReactDOM from 'react-dom';
import Index from './Index';
import { Router, Route, Link } from 'react-router-dom';
import { IndexRoute } from 'react-router';
import history from './history';


ReactDOM.render(
    <Router history={history}>
        <Index/>
    </Router>,
    document.getElementById('content'));

