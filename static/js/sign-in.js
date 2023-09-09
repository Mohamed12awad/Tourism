import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { firebaseConfig } from "./firebase-config.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(); // Initialize authentication separately

const signinForm = document.getElementById("signin-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("error-message");

signinForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  // Use the auth object directly for signInWithEmailAndPassword
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in successfully
      const user = userCredential.user;
      location.href = "./";
      //   console.log(" welcome");
    })
    .catch((error) => {
      // Handle errors
      errorMessage.textContent = error.message;
    });
});
