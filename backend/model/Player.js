const playerState = require('./playerState').playerState;

class Player
{
    constructor(name)
    {
        this.name = name;
        this.state = playerState.LOBBY;
    }
    getName()
    {
        return this.name;
    }
    setState(state)
    {
        this.state = state;
    }
    getState()
    {
        return this.state;
    }

}
module.exports = Player;