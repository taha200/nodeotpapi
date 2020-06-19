import React, { Component } from 'react';
import Routers from './Route';
import {Provider} from 'react-redux';
import store from './store';
import firebase from "firebase";


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyB1tHH4jOMUDzuLbgDJxayEyhSYccmLG7A",
    authDomain: "fmgworldapp.firebaseapp.com",
    databaseURL: "https://fmgworldapp.firebaseio.com",
    projectId: "fmgworldapp",
    storageBucket: "fmgworldapp.appspot.com",
    messagingSenderId: "669219700025",
    appId: "1:669219700025:web:574217554d901bccd3fce8",
    measurementId: "G-L6QSQLNTVE"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routers />
      </Provider>
    );
  }
}

export default App;
