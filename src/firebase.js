import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyASkoAvLIjavqI-EQNcF4jeU0_3xn6WIyw",
  authDomain: "todolist-e6311.firebaseapp.com",
  databaseURL: "https://todolist-e6311-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "todolist-e6311",
  storageBucket: "todolist-e6311.appspot.com",
  messagingSenderId: "640698028294",
  appId: "1:640698028294:web:d05b389c31d5635d040e87",
  measurementId: "G-9VFD58MB81"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;