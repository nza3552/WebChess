import React from 'react';
import axios from 'axios';
import Navigation from './Components/Navigation'
import Message from '../utils/Message';

export default class SignIn extends React.Component
{
    constructor(props)
    {
        super(props)
        this.message = new Message("Please enter your name to sign in");
        this.name = ""
        
        this.change = this.change.bind(this);
        this.submitName = this.submitName.bind(this);
    }
    change(ev)
    {
        this.name = ev.target.value;
    }
    submitName(ev)
    {
        //TODO check for valid name here
        //using this.name
        let result = axios.post("http://localhost:3001/api/signin", {name:this.name}).then(
            function(data)
            {
                this.message=data.data.message;
                this.props.changeMessage(this.message);
                if(data.data.signedIn)
                {
                    return "/"
                }
                else
                {
                    return "/signIn"
                }
            });
        console.log("result:" + result);
        return result;
        // this.message = result.data;
    }

    render()
    {
        console.log("rendering sign in");
        return(
            <div className="signInPage">
                <Navigation message={this.message}/>
                    <p>sign in page</p>
                    <input placeholder="Name" type="text" onChange={this.change}/>
                    <button formAction="/" formMethod="POST" type="submit" onClick={this.submitName} >Log In</button>
            </div>
        );
    }
}