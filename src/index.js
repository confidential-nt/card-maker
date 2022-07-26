import React from "react";
import ReactDOM from "react-dom/client";
import "./index.module.css";

import App from "./app";
import { BrowserRouter } from "react-router-dom";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import Database from "./service/database/database";
import { connectDatabaseEmulator } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_ZJ3h2EHDzVwbEcdig0eB1FGMv4z78cU",
  authDomain: "business-card-maker-d721c.firebaseapp.com",
  projectId: "business-card-maker-d721c",
  storageBucket: "business-card-maker-d721c.appspot.com",
  messagingSenderId: "127174221003",
  appId: "1:127174221003:web:1a1dcc69cf33ccfe944f4e",
  measurementId: "G-JJ3CZQKDWF",
  databaseURL: "https://business-card-maker-d721c-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const database = new Database(app);
if (window.location.hostname === "localhost") {
  connectDatabaseEmulator(database.db, "localhost", 7070);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App database={database} />
  </BrowserRouter>
);

// 만들어야 할 것.
// 1. 로그인 화면. url = "/" => 유저가 로그인되어있지 않다면, 떠야함.
// 2. 메인 화면. => 유저가 로그인되어 있다면, "/" 에서 바로 "/app" 으로 가야함.
