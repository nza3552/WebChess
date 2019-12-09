import React from 'react';
import GameLobby from './Components/GameLobby'
import Navigation from './Components/Navigation'
// import axios from 'axios';

export default class Home extends React.Component
{
    render()
    {
        console.log("rendering home");
        let session = window.localStorage;

        let player = session.getItem("player");
        if(player)
        {
            return(
            <div className="homePage">
                <Navigation message={this.message}/>
                <GameLobby changeMessage={this.changeMessage}/>
            </div>);
        }
        
        return(
        <div className="homePage">
            <Navigation message={this.message}/>
        </div>);
    }
}