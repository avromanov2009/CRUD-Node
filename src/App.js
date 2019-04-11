import React, {Component} from 'react';
import './App.css';
import './Styles.css';
import AuthService from "./components/AuthService";

class App extends Component {

    constructor(props) {
        super(props);
        this.Auth = new AuthService();
    }

    componentWillMount() {
        return this.Auth.loggedIn() ? this.props.history.replace('/profile') : this.props.history.replace('/login');
    }

    render() {
        return (
            <div className="App">
            </div>
        );
    }
}

export default App;
