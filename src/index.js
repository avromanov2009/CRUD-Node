import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from "./components/Login";
import {BrowserRouter} from "react-router-dom";
import {Route} from 'react-router-dom';
import {Switch} from "react-router";
import Register from "./components/Register";
import Profile from "./components/Profile";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact={true} path='/profile' component={Profile}/>
            <Route exact={true} path="/register" component={Register}/>
            <Route exact={true} path="/login" component={Login}/>
            {/*<Route exact={true} path="/" component={App}/>*/}
            <Route path='*' component={App}/>
        </Switch>
    </BrowserRouter>
    , document.getElementById('root'));
