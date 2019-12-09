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

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  // componentDidMount() {
    // this.getDataFromDb();
    // if (!this.state.intervalIsSet) {
    //   let interval = setInterval(this.getDataFromDb, 1000);
    //   this.setState({ intervalIsSet: interval });
    // }
  // }

  // never let a process live forever
  // always kill a process everytime we are done using it
  // componentWillUnmount() {
  //   if (this.state.intervalIsSet) {
  //     clearInterval(this.state.intervalIsSet);
  //     this.setState({ intervalIsSet: null });
  //   }
  // }

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our first get method that uses our backend api to
  // fetch data from our data base
  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = (message) => {
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post('http://localhost:3001/api/putData', {
      id: idToBeAdded,
      message: message,
    });
  };

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = (idTodelete) => {
    parseInt(idTodelete);
    let objIdToDelete = null;
    this.state.data.forEach((dat) => {
      if (dat.id === idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete('http://localhost:3001/api/deleteData', {
      data: {
        id: objIdToDelete,
      },
    });
  };
  //TODO this is the thing that keeps the page up to date.
  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    parseInt(idToUpdate);
    this.state.data.forEach((dat) => {
      if (dat.id === idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });
    axios.post('http://localhost:3001/api/updateData', {
      id: objIdToUpdate,
      update: { message: updateToApply },
    });
  };

  changeMessage(message)
  {
    this.message = message;
  }

  getNewSessionID()
  {
    return axios.get("http://localhost:3001/api/newSession").then((response)=>{return response.data});
  }

  // componentWillMount()
  // {
  //   let session = window.localStorage;
  //   let sessionID = Promise.resolve(session.getItem("sessionID"));
  //   console.log("Willmount: " + Promise.resolve(sessionID));
  // }

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() 
  {

    // let session = window.localStorage; 

    // console.log("rendering app");
    // let sessionID = session.getItem("sessionID");
    // console.log("session id: " + sessionID);
    // if(!sessionID)
    // {
    //   console.log("no sess id, getting new one");
    // }
    return (
    <div>
      <Router>
        <Switch>
          <Route path="/">
            <Home changeMessage={this.changeMessage} message={this.message}/>
          </Route>
          <Route path="signin">
            <SignIn changeMessage={this.changeMessage} message={this.message}/>
          </Route>
        </Switch>
      </Router>
    </div>);
    // return (
    //   <div>
    //     <ul>
    //       {data.length <= 0
    //         ? 'NO DB ENTRIES YET'
    //         : data.map((dat) => (
    //             <li style={{ padding: '10px' }} key={data.message}>
    //               <span style={{ color: 'gray' }}> id: </span> {dat.id} <br />
    //               <span style={{ color: 'gray' }}> data: </span>
    //               {dat.message}
    //             </li>
    //           ))}
    //     </ul>
    //     <div style={{ padding: '10px' }}>
    //       <input
    //         type="text"
    //         onChange={(e) => this.setState({ message: e.target.value })}
    //         placeholder="add something in the database"
    //         style={{ width: '200px' }}
    //       />
    //       <button onClick={() => this.putDataToDB(this.state.message)}>
    //         ADD
    //       </button>
    //     </div>
    //     <div style={{ padding: '10px' }}>
    //       <input
    //         type="text"
    //         style={{ width: '200px' }}
    //         onChange={(e) => this.setState({ idToDelete: e.target.value })}
    //         placeholder="put id of item to delete here"
    //       />
    //       <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
    //         DELETE
    //       </button>
    //     </div>
    //     <div style={{ padding: '10px' }}>
    //       <input
    //         type="text"
    //         style={{ width: '200px' }}
    //         onChange={(e) => this.setState({ idToUpdate: e.target.value })}
    //         placeholder="id of item to update here"
    //       />
    //       <input
    //         type="text"
    //         style={{ width: '200px' }}
    //         onChange={(e) => this.setState({ updateToApply: e.target.value })}
    //         placeholder="put new value of the item here"
    //       />
    //       <button
    //         onClick={() =>
    //           this.updateDB(this.state.idToUpdate, this.state.updateToApply)
    //         }
    //       >
    //         UPDATE
    //       </button>
    //     </div>
    //   </div>
    // );
  }
}

export default App;