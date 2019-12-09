import React from 'react';

export default class Navigation extends React.Component
{
    render()
    {   
        // console.log("rendering navigation");
        let session = window.localStorage;

        let player = session.getItem("playerName");
        // console.log("player: " + player);
        let innards = (<a href="/signin">Sign In</a>)
        if(player)
        {
            console.log("player is signed in, so button is sign out");
            innards = (<a href="/api/signout">Sign Out</a>)
        }
        return(
            <div className="navigation">
                <a href="/">Home</a>
                {innards}
            </div>
        )
    }
}