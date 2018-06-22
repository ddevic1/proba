import React, { Component } from 'react';
import { Jumbotron, Button, Container } from 'reactstrap';
import SearchBar from '../SearchBar/SearchBar';

class HeaderPocetna extends Component {
    constructor(props) {
        super(props);
        console.log({"HeaderPocetna": this.props.friends });
    }
    render() {
        return (
            <div>
                <Jumbotron fluid id="jumbotronPoc">
                    <Container fluid>
                        <div className="row">
                            <div className="col-md-5">
                              < SearchBar friends1={this.props.friends}></SearchBar>
                            </div>
                            <div className="col-md-4">
                                <Ikona name="person" text="Profile"></Ikona>
                            </div>
                            <div className="col-md-3">
                                <div className="col-md-4">
                                    <Ikona name="sms" text="Messages"></Ikona>
                                </div>
                                <div className="col-md-4">
                                    <Ikona name="group" text="Follow requests"></Ikona>
                                </div>
                                <div className="col-md-4">
                                    <Ikona name="notifications" text="Notifications"></Ikona>
                                </div>
                            </div>
                        </div>
                    </Container>
                </Jumbotron>
            </div>
        )
    }

}

class Ikona extends Component {
    render() {
        return (
            <a href="#" >
                <span className="profile">
                    <i className="material-icons " > {this.props.name}  </i>
                    <br />
                    <p class="show1 profile" > {this.props.text} </p>
                </span>
            </a>
            );
    }
}

export default HeaderPocetna;