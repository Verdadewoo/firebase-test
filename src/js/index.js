// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut  } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC_Hi5kX-pipye4c_URlQI0NBLw4UubkE4",
  authDomain: "app-b0270.firebaseapp.com",
  databaseURL: "https://app-b0270-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "app-b0270",
  storageBucket: "app-b0270.appspot.com",
  messagingSenderId: "905375352903",
  appId: "1:905375352903:web:4e2212023f143d071d0962",
  measurementId: "G-RSZCWFMNBJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth();

signUp.addEventListener('click',(e) => {
// e.preventDefault();

// Disable the login button
signUp.disabled = true;
// continueMessage.style.display = "none";
spinner.style.display = "block";

document.getElementById("error-message-email").style.display = "none";
document.getElementById("error-message-password").style.display = "none";
var emailInput = document.getElementById("email");
emailInput.classList.remove("is-invalid");

var email = document.getElementById('email').value;
var password = document.getElementById('password').value;
var username = document.getElementById('username').value;

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
  // Signed in 
    const user = userCredential.user;

    set(ref(database, 'users/' + user.uid),{
      username: username,
      email: email
    })

    // alert('user created!');
    // window.location.href = 'login.html';
    if (userCredential) {
      spinner.style.display = "none";
      signUp.disabled = false; // Enable the login button
      const alert = document.getElementById("success-message");
      const alertError = document.getElementById("error-message");
      alert.innerHTML = 'Account created!';
      alert.style.display = "block";
      alertError.style.display = "none";
      // document.getElementById('username').value = '';
      // document.getElementById('email').value = '';
      // document.getElementById('password').value = '';

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;

          const dt = new Date();
            update(ref(database, 'users/' + user.uid),{
            last_login: dt,
          })

            window.location.href = 'test.html';
            
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          // alert(errorMessage);
          if (errorMessage) {
            // continueMessage.style.display = "block";
            spinner.style.display = "none";
            login.disabled = false; // Enable the login button
            const message = 'Invalid username or password.';
            const alert = document.getElementById("error-message");
            alert.innerHTML = message;
            alert.style.display = "block";
          } else {
            document.getElementById("error-message").style.display = "none";
          }
        });

    } else {
      document.getElementById("success-message").style.display = "none";
    }
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.log(errorCode);

    // alert(errorMessage);
    if (errorCode) {
      // continueMessage.style.display = "block";
      spinner.style.display = "none";
      signUp.disabled = false; // Enable the login button
      const index = errorCode.indexOf("/");
      const message = errorCode.substring(index + 1);
      const replacedMessage = message.replace(/-/g, " ");
      const capitalizedMessage = replacedMessage.charAt(0).toUpperCase() + replacedMessage.slice(1);
      const alert = document.getElementById("error-message");
      const alertMail = document.getElementById("error-message-email");
      const alertPass = document.getElementById("error-message-password");
      alert.innerHTML = capitalizedMessage;
      // alert.style.display = "block";

      if (capitalizedMessage.includes("mail")) {
        alertMail.innerHTML = capitalizedMessage;
        alertMail.style.display = "block";
        var emailInput = document.getElementById("email");
        emailInput.classList.add("is-invalid");
      } else if (capitalizedMessage.includes("password")) {
        alertPass.innerHTML = capitalizedMessage;
        alertPass.style.display = "block";
      } else {
        alert.style.display = "block";
      }

    } else {
      document.getElementById("error-message").style.display = "none";
    }
  });

});

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    //bla bla bla
    // ...
  } else {
    // User is signed out
    // ...
    //bla bla bla
  }
});