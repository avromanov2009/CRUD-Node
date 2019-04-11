import React from "react";
import '../Styles.css';
import AuthService from './AuthService';
import config from './../app/config/application.config.js';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handlePressRegister = this.handlePressRegister.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthService(`http://${config.serverHost}:${config.serverPort}/`);
    }

    componentWillMount(){
        if(this.Auth.loggedIn())
            this.props.history.replace('/');
    }

    handleFormSubmit(e){
        e.preventDefault();
        this.Auth.login(this.state.email,this.state.password)
            .then(res =>{
                this.props.history.replace('/profile');
            })
            .catch(err =>{
                alert(err);
            })
    }

    handlePressRegister() {
        this.props.history.replace('/register');
    }

    render() {
        return (
            <div className="center">
                <div className="card">
                    <h1>Login</h1>
                    <form>
                        <input
                            className="form-item"
                            placeholder="e-mail goes here..."
                            name="email"
                            type="email"
                            onChange={this.handleChange}
                        />
                        <input
                            className="form-item"
                            placeholder="Password goes here..."
                            name="password"
                            type="password"
                            onChange={this.handleChange}
                        />
                        <input
                            className="form-submit"
                            value="Submit and go"
                            type="submit"
                            onClick={this.handleFormSubmit}
                        />
                    </form>
                    <input className='form-submit' type='button' onClick={this.handlePressRegister} value='Register'/>
                </div>
            </div>
        )
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }
}

export default Login;
