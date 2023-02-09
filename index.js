import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  push,
  get,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import {
  getAuth,
  signInAnonymously,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { Member } from "./js/scrollerModule.js";
import { updateProgress } from "./js/progress-bar.js";

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

    new_member.scroller_id = auth.currentUser.uid;
    const dbRef = ref(getDatabase());

    get(child(dbRef, `users/${new_member.scroller_id}`)).then((snapshot) => {
      if (!snapshot.exists()) {
        set(
          ref(database, "users/" + new_member.scroller_id),
          new_member.getAllProps()
        );
      }
    });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

document.addEventListener("DOMContentLoaded", () => {
  const ACTIVE_ELEM_SELECTOR = "a.active";
  scrollHandler();
  let current = document.querySelector(ACTIVE_ELEM_SELECTOR);

  new_member.on("add-timestamp", (timestamp) => {
    push(
      ref(database, `users/${new_member.scroller_id}/timestamps`),
      timestamp
    );
  });

  window.onscroll = function () {
    scrollHandler();
    updateProgress();
    const check_section = document.querySelector(ACTIVE_ELEM_SELECTOR);
    if (check_section.innerHTML !== current.innerHTML) {
      current = check_section;
      new_member.addTimestamp(current.innerHTML);
    }
  };
});

function scrollHandler() {
  const EXPANDED_CLASS = "navbar--expanded";
  const nav_elem = document.getElementById("navbar-elem");
  const ul_elem = document.getElementById("navbar-list-items");
  const sections = document.querySelectorAll("section");
  const positions = calculatePositions(sections);
  const distances = calculateDistance(positions);
  const CLASS_ACTIVE = "active";

  const MIN = Math.min(...distances.filter((num) => num > 0));

  for (const i in distances) {
    if (window.scrollY > 80) {
      nav_elem.classList.add(EXPANDED_CLASS);
    } else {
      nav_elem.classList.remove(EXPANDED_CLASS);
    }
    const current_elem = ul_elem.children[i].firstChild;
    if (distances[i] === MIN && !current_elem.classList.contains("active")) {
      current_elem.classList.add(CLASS_ACTIVE);
    }
    if (distances[i] !== MIN && current_elem.classList.contains("active")) {
      current_elem.classList.remove(CLASS_ACTIVE);
    }
  }
}

/**
 * @param {Array<Number>} positions
 * @returns {Array<Number>}
 */
function calculateDistance(positions) {
  const navbar_elem = document.querySelector("nav.navbar");
  const SCROLL_WAY = window.scrollY - navbar_elem.scrollHeight;
  const distances = [];
  for (const position of positions) {
    distances.push(position - SCROLL_WAY);
  }
  return distances;
}

/**
 * @param {NodeListOf<HTMLElement>} sections
 * @returns {Array<Number>}
 */
function calculatePositions(sections) {
  const all_positions = [];
  for (const section of sections) {
    all_positions.push(section.offsetTop + section.offsetHeight);
  }
  return all_positions;
}
