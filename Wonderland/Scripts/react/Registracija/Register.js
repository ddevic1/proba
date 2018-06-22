import React, { Component } from 'react';
import './RegisterJava';


class Register extends Component {
    constructor(props) {

        super(props);
        this.state ={
            users: []
        }
        
    }

    handleRegisterSubmit(e) {
        e.preventDefault();
       
        const data = new FormData(e.target);
        
        fetch('default/AddUser', {
            method: 'POST',
            body: data,

        }).then(function (response) {
        });
       
    }
   
    render() {
        return (
            <div class="container">
                <div class="row">
                    <div id="formadiv" class="col-md-6 text-center">
                        
                        <form action="/" onSubmit={(e) => this.handleRegisterSubmit(e)} class="loginForm">
                            <div class="input-group">
                                <input type="text" id="ime" name="name" class="form-control shadow" placeholder="Ime" />
                                <input type="text" id="prezime" name="surname" class="form-control shadow" placeholder="Prezime" />
                                <input type="text" id="e-mail" name="email" class="form-control shadow" placeholder="E-mail"/>
                                <input type="password" id="pass" name="password" class="form-control shadow" placeholder="Password" />
                                <input type="date" id="datumrodj" name="birthdate" class="form-control shadow" placeholder="Datum rođenja" />
                                <input type="submit" id="submit" class="form-control shadow" value="Registruj se"/>
					            </div>
				</form>
		
                                </div>
                                <div class="col-md-2">
                                    <div class="aro-pswd_info">
                                        <div id="pswd_info">
                                            <h4>Password must be requirements</h4>
                                            <ul>
                                                <li id="letter" class="invalid">At least <strong>one letter</strong></li>
                                                <li id="capital" class="invalid">At least <strong>one capital letter</strong></li>
                                                <li id="number" class="invalid">At least <strong>one number</strong></li>
                                                <li id="length" class="invalid">Be at least <strong>8 characters</strong></li>
                                                <li id="space" class="invalid">be<strong> use [~,!,@,#,$,%,^,&,*,-,=,.,;,']</strong></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
	</div>
                        </div>
        )
    }

}

export default Register;