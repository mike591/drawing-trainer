import React from "react";
import ReactDOM from "react-dom";
import App from "components/App";
import firebase from "firebase/app";
import "normalize.css";
import "semantic-ui-css/semantic.min.css";
import "./main.scss";

firebase.initializeApp({
  apiKey: "AIzaSyDBUTth9seIVwqZ-u_j49N_e51w4Iui8oQ",
  authDomain: "drawingtrainer-5ecd0.firebaseapp.com",
  databaseURL: "https://drawingtrainer-5ecd0.firebaseio.com",
  projectId: "drawingtrainer-5ecd0",
  storageBucket: "drawingtrainer-5ecd0.appspot.com",
  messagingSenderId: "275778725549",
  appId: "1:275778725549:web:8fb9b0a312d2948f000824",
  measurementId: "G-9XWPZX33MB",
});

ReactDOM.render(<App />, document.getElementById("root"));
