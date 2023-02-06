import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  push,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import {
  getAuth,
  signInAnonymously,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { Member } from "./js/scrollerModule.js";
import { initLocalStorage, updateLocalStorage } from "./js/functionsModule.js";

const firebaseConfig = {
  apiKey: "AIzaSyDrZrZKKHfsd0vqQdxtTxj6BCBrtsHqxdE",
  authDomain: "say-hi-c64d4.firebaseapp.com",
  databaseURL:
    "https://say-hi-c64d4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "say-hi-c64d4",
  storageBucket: "say-hi-c64d4.appspot.com",
  messagingSenderId: "968499690915",
  appId: "1:968499690915:web:c25d55dfa54a530d55ee16",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const new_member = new Member();

// Hi =) I need timestamps to get better with sections of my portfolio
// I don't know who you are and where are you from
// All users are anonymous. Each user has own timestamps
// c u <3
signInAnonymously(auth)
  .then(() => {
    console.log("signed in...");
    const new_scroller = initLocalStorage(new_member.getAllProps());

    if (new_scroller) {
      const scroller_id = auth.currentUser.uid;
      new_member.scroller_id = scroller_id;
      set(ref(database, "users/" + scroller_id), new_member.getAllProps());
      updateLocalStorage(new_member.getAllProps());
    } else {
      const scroller = JSON.parse(localStorage.getItem("new-scroller"));
      new_member.init(scroller);
    }
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

document.addEventListener("DOMContentLoaded", () => {
  let current = document.querySelector("a.nav-link.js-scroll-trigger.active");

  new_member.on("add-timestamp", (timestamp) => {
    push(
      ref(database, `users/${new_member.scroller_id}/timestamps`),
      timestamp
    );
    updateLocalStorage(new_member.scroller);
  });

  window.onscroll = function () {
    const check_section = document.querySelector(
      "a.nav-link.js-scroll-trigger.active"
    );
    if (check_section.innerHTML !== current.innerHTML) {
      current = check_section;
      new_member.addTimestamp(current.innerHTML);
    }
  };
});
