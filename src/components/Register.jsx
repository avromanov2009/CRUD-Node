import React, {Component} from "react";
import AuthService from './AuthService';
import RegisterButton from "./RegisterButton";
import config from '../app/config/application.config.js';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validPass: true,
            validData: false
        }
        this.handleRegister = this.handleRegister.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.Auth = new AuthService(`http://${config.serverHost}:${config.serverHost}`);
    }

    componentWillMount() {
        if (this.Auth.loggedIn()) {
            this.props.history.replace('/profile');
        }
    }

    handlePassword(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
        this[e.target.name] = e.target.value;
        this.password !== this.passwordConfirmation ?
            this.setState({validPass: false}) : this.setState({validPass: true});
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleRegister() {
        this.Auth.register(this.state);
        this.props.history.replace('/login');
    }

    handleLogin() {
        this.props.history.replace('/login')
    };

    render() {
        return (
            <div className="center">
                <div className="card">
                    <h1>Register</h1>
                    <form className="register-form">
                        Full name
                        <input
                            className="form-item"
                            placeholder="Full name goes here"
                            name="fullName"
                            type="text"
                            onChange={this.handleChange}
                            required
                        />
                        Email
                        <input
                            className="form-item"
                            placeholder="Email goes here..."
                            name="email"
                            type="email"
                            onChange={this.handleChange}
                        />
                        Password
                        <input
                            className="form-item"
                            placeholder="Password goes here..."
                            name="password"
                            type="password"
                            onChange={this.handlePassword}
                        />
                        Comfirm password
                        <input
                            className="form-item"
                            placeholder="Comfirmation password goes here..."
                            name="passwordConfirmation"
                            type="password"
                            onChange={this.handlePassword}
                        />
                        <RegisterButton errorTexts={{eqPass:"Passwords aren't equals", assertData:"Some field is missing"}} validData={this.state.validData} validPass={this.state.validPass} onClick={this.handleRegister}/>

                    </form>
                    <input className='form-submit' type='button' onClick={this.handleLogin} value='Login'/>
                </div>
            </div>
        )
    }
}


export default Register;
