// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import {
    getDatabase,
    ref,
    onChildAdded,
    set
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDCAJlFaCefUdGJO9NITocAyT0JaHpUxro",
    authDomain: "prog22-chat-a6b69.firebaseapp.com",
    projectId: "prog22-chat-a6b69",
    storageBucket: "prog22-chat-a6b69.appspot.com",
    messagingSenderId: "398996698001",
    appId: "1:398996698001:web:f24b6a3256c5de34a92030",
    databaseURL:
        "https://prog22-chat-a6b69-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

// Create reference, where in the database do we want to  work 
const chatRef = ref(db, "/chat");

// Listen to database changes
onChildAdded(chatRef, function (data) {
    // Create message element and append to list element
    const message = document.createElement("li");
    message.innerText = data.val();
    list.appendChild(message);
});

// Chat
const input = document.querySelector("input");
const list = document.querySelector("ul");

input.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        // create "unique" id for message
        const messageId = Date.now();

        // Send to database
        set(ref(db, "chat/" + messageId), input.value);

        // Clear input
        input.value = "";
    }
});