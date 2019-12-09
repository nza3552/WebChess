const Player = require('./Player');
class PlayerLobby
{
    constructor()
    {
        this.players = [];
    }
    signIn(name, sessID)
    {
        if(this.playerByName(name))
        {
            return false;
        } 
        else
        {
            let p = new Player(name)
            this.players.push({sessID:sessID, name:name, player:p});
            return true;
        }
    }
    playerByID(sessID)
    {
        return this.players.find(player => {player.sessID === sessID})
    }
    playerByName(name)
    {
        return this.players.find(player => {player.name === name})
    }
}
module.exports = PlayerLobby;