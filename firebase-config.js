import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// SPRINT FUTURES CONFIGURATION
const firebaseConfig = {
  apiKey: "AIzaSyAkTwI7TbJwXPbVQ2OrKjAAIaWLvyfuudc",
  authDomain: "sprintfutures.firebaseapp.com",
  databaseURL: "https://sprintfutures-default-rtdb.firebaseio.com",
  projectId: "sprintfutures",
  storageBucket: "sprintfutures.firebasestorage.app",
  messagingSenderId: "535060943616",
  appId: "1:535060943616:web:d15fc5225538eaeb3459e5",
  measurementId: "G-9XFQV3PLEV"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Export the database connection to be used by other files
export { db };
