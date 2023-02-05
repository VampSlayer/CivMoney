import { createApp } from "vue";
import { createPinia } from "pinia";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Styles
import "./assets/micon.min.css";
import "./assets/themes.css";
import "./assets/style.scss";

import "bootstrap/dist/css/bootstrap.css";

const firebaseConfig = {
  apiKey: "AIzaSyAoRjrHf5dD84tsIIdBllsd7LKnJFAh3B4",
  authDomain: "civmoney.firebaseapp.com",
  projectId: "civmoney",
  storageBucket: "civmoney.appspot.com",
  messagingSenderId: "110850086366",
  appId: "1:110850086366:web:265b50a9946afae48b794f",
  measurementId: "G-JHP3W77Z09",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
getAnalytics(firebase);
getAuth(firebase);
getFirestore(firebase);

// Initialize Vue
import App from "./App.vue";
import Router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(Router);

app.mount("#app");
