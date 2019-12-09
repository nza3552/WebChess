const PlayerLobby = require('./PlayerLobby')

class GameManager
{
    constructor()
    {
        this.playerLobby = new PlayerLobby();
    }
    signIn(name, sessID)
    {
        return this.playerLobby.signIn(name, sessID);
    }
    playerByID(sessID)
    {
        return this.playerLobby.playerByID(sessID);
    }
    playerByName(name)
    {
        return this.playerLobby.playerByName(name);
    }
}
module.exports = GameManager;