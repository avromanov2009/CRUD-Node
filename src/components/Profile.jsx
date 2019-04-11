import React from "react";
import '../Styles.css';
import AuthService from './AuthService';
import axios from 'axios';
import config from './../app/config/application.config.js';
import * as jwt from "jsonwebtoken";
import UpdateButton from "./UpdateButton";

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.Auth = new AuthService();
        this.state = {
            id: '',
            email: '',
            fullName: '',
            password: '',
            address: '',
            phoneNumber: '',
            mustUpdate: false
        }
    }

    componentWillMount() {
        if (this.Auth.loggedIn()) {
            this.getProfile();
        } else this.props.history.replace('/login');
    }

    getProfile() {
        let user = this.Auth.getProfile();
        this.Auth.setToken(this.Auth.getToken());
        this.setState({
            id: user.id,
            email: user.email || '',
            fullName: user.fullName || '',
            password: user.password || '',
            address: user.address || '',
            phoneNumber: user.phoneNumber || ''
        });
    }

    handleUpdate() {
        axios.post(
            `http://${config.serverHost}:${config.serverPort}/user/${this.state.id}`, {
                email: this.state.email,
                fullName: this.state.fullName,
                password: this.state.password,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber
            },
            {
                headers: {
                    "Authorization": "Bearer " + this.Auth.getToken()
                },
            }
        )
            .then(response => {
                // console.log('response');
                // console.log(response);
                this.Auth.setToken(response.data.token);
                this.setState(response.data);
                this.setState({
                    mustUpdate: false
                })
            })
            .catch(error => console.log(error));

    }

    render() {

        return (
            <div className="center">
                <div className="card">
                    <h1>Profile</h1>
                    <p>Here you can update your profile</p>
                    <form className="profile-form">
                        Email
                        <input
                            className="form-item"
                            placeholder="e-mail goes here..."
                            name="email"
                            type="email"
                            readOnly={true}
                            value={this.state.email}
                        />
                        Password
                        <input
                            className="form-item"
                            placeholder="Password goes here..."
                            name="password"
                            type="text"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        Address
                        <input
                            className="form-item"
                            placeholder="Password goes here..."
                            name="address"
                            type="text"
                            value={this.state.address}
                            onChange={this.handleChange}
                        />
                        Full name
                        <input
                            className="form-item"
                            placeholder="Password goes here..."
                            name="fullName"
                            type="text"
                            value={this.state.fullName}
                            onChange={this.handleChange}
                        />
                        Phone number
                        <input
                            className="form-item"
                            placeholder="Phone number goes here..."
                            name="phoneNumber"
                            type="text"
                            value={this.state.phoneNumber}
                            onChange={this.handleChange}
                        />
                        {/*{!this.state.mustUpdate &&*/}
                        <UpdateButton mustUpdate={this.state.mustUpdate} onClick={this.handleUpdate}/>
                        {/*}*/}
                    </form>
                    <input onClick={this.handleLogout} className='form-submit' type='button' value='Logout'/>
                </div>
            </div>
        )
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });

        if (this.state !== this.Auth.getProfile()) {
            this.setState({
                mustUpdate: true
            })
        } else this.setState({mustUpdate: false})
    }

    handleLogout() {
        this.Auth.logout();
        this.props.history.replace('/login');
    }
}

export default Profile;
