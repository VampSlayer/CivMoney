import { createApp } from "vue";
import { createPinia } from "pinia";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAoRjrHf5dD84tsIIdBllsd7LKnJFAh3B4",
  authDomain: "civmoney.firebaseapp.com",
  projectId: "civmoney",
  storageBucket: "civmoney.appspot.com",
  messagingSenderId: "110850086366",
  appId: "1:110850086366:web:265b50a9946afae48b794f",
  measurementId: "G-JHP3W77Z09"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);

// Initialize Vue

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(firebase);
app.use(analytics);

app.mount("#app");
