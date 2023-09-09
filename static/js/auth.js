// Auth
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
const auth = getAuth(); // Initialize authentication separately

onAuthStateChanged(auth, (user) => {
  if (!user) {
    // User isn't signed in, you can't access user information
    location.href = "./signin.html";
  }
});
