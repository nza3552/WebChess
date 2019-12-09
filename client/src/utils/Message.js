const MessageType = require('./MessageType.js');
class Message
{
    constructor(message, state)
    {
        this.message = message;
        this.state = state;
    }
    error(message)
    {
        return new Message(message, MessageType.ERROR);
    }
    info(message)
    {
        return new Message(message, MessageType.INFO);
    }
}

module.exports = Message;