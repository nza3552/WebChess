const GameManager = require('./model/GameManager');

const Message = require('./utils/Message');
const MessageType = require('./utils/MessageType');
const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./data');
const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();
// this is our MongoDB database

// const dbRoute = "mongodb+srv://noahwhygodwhy:Googleplex%211@webchess-lvcmh.mongodb.net/test?retryWrites=true&w=majority";
// mongoose.connect(dbRoute, { useNewUrlParser: true });
// let db = mongoose.connection;
// db.once('open', () => console.log('connected to the database'));
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));


//MODEL CREATION
var gm = new GameManager();

//ROUTE CREATION
var sessionIDGiver = 1; //MUST START AT ONE, 0 IS NOT A VALID SESSION ID
router.get('/newSession', (req, res) => {
    console.log("new session");
    res.send("" + sessionIDGiver++);
});
router.post('/signin', (req, res) => {
    console.log("signing in");
    // let newName = req.body.name;
    let newPlayer = gm.signIn(req.body.name, req.body.sessID);
    if(!newPlayer)//player name is taken
    {
        res.json({message:new Message("That name is already taken.", MessageType.ERROR), signedIn:false});
    }
    else//player name isn't taken
    {
        res.json({message: new Message("Signed in.", MessageType.INFO), signedIn:true});
    }
});

router.get('/recoverPlayerName', (req, res) => {
    console.log("recovering player name");
    let oldPlayer = gm.playerByID(req.body.sessID);
    if(oldPlayer)
    {
        console.log("old player exists");
        res.json(oldPlayer.name);
    }
    else
    {   
        console.log("old player does not exist");
        res.json(null);
    }
});












router.get('/getData', (req, res) => {
    Data.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

router.post('/updateData', (req, res) => {
    const { id, update } = req.body;
    Data.findByIdAndUpdate(id, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

router.delete('/deleteData', (req, res) => {
    const { id } = req.body;
    Data.findByIdAndRemove(id, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

router.post('/putData', (req, res) => {
    let data = new Data();

    const { id, message } = req.body;

    if ((!id && id !== 0) || !message) {
        return res.json({
        success: false,
        error: 'INVALID INPUTS',
        });
    }
    data.message = message;
    data.id = id;
    data.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
