import React, { Component } from 'react';

import {
    Route,
    Switch,
    Redirect,
    withRouter
} from "react-router-dom"

import './App.css';
import Main from "./components/Main/Main";

class App extends Component {
    render() {
        const { history } = this.props

        return (
            <div className="App">
                <Switch>
                    <Route history={history} path='/sign-in' component={Main} />
                    <Route history={history} path='/sign-up' component={Main} />
                    <Route history={history} path='/orders' component={Main} />
                    <Route history={history} path='/dashboard' component={Main} />
                    <Redirect from='/' to='/sign-in'/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(App)

