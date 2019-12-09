import Home from './views/Home';
import SignIn from './views/SignIn';
import React, { Component } from 'react';
import axios from 'axios';
import {
BrowserRouter as Router,
Switch,
Route
} from "react-router-dom";
import Message from './utils/Message';
import MessageType from './utils/MessageType';

class App extends Component {
// initialize our state
    state = {
        data: [],
        id: 0,
        message: null,
        intervalIsSet: false,
        idToDelete: null,
        idToUpdate: null,
        objectToUpdate: null,
    };

    constructor(props)
    {
        super(props);
        this.message = new Message("Welcome to Web Chess", MessageType.INFO);
    }

    changeMessage(message)
    {
        this.message = message;
    }

    recoverPlayerName()
    {
        axios.get("http://localhost:3001/api/recoverPlayerName").then(
        function(data)
        {
            if(data.data != null)
            {
                window.localStorage.setItem("playerName", data.data);
            }
        });
    }

    getNewSessionID()
    {
        axios.get("http://localhost:3001/api/newSession").then(
        function(data)
        {
            window.localStorage.setItem("sessionID", data.data);
        });
    }

    componentWillMount()
    {
        console.log("app will mount");
        let session = window.localStorage;
        let sessionID = session.getItem("sessionID");
        console.log("session id: " + sessionID);
        console.log();
        if(!(sessionID>0))
        {
            this.getNewSessionID();
        }
        else
        {
            if(!session.getItem("playerName"))
            {
                this.recoverPlayerName();
            }
        }
    }
    
    render()
    {
        return (
        <div>
        <Router>
            <Switch>
            <Route exact path="/">
                <Home changeMessage={this.changeMessage} message={this.message}/>
            </Route>
            <Route exact path="/signin">
                <SignIn changeMessage={this.changeMessage} message={this.message}/>
            </Route>
            </Switch>
        </Router>
        </div>);
    }
}

export default App;