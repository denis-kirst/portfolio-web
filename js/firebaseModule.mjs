import { firebaseConfig } from "./variables.mjs";
import {
  getDatabase,
  ref,
  set,
  push,
  child,
  get,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import {
  getAuth,
  signInAnonymously,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { Member } from "./scrollerModule.mjs";

const fb = {};

/**
 * initialize firebase
 */
function initFB() {
  fb.app = initializeApp(firebaseConfig);
  fb.auth = getAuth(fb.app);
  fb.database = getDatabase(fb.app);
}

/**
 * sign in anonymously to get timestamps
 * @param {Member} member
 */
function signInScroller(member) {
  signInAnonymously(fb.auth)
    .then(() => {
      console.log("signed in...");

      member.scroller_id = fb.auth.currentUser.uid;
      const dbRef = ref(getDatabase());

      get(child(dbRef, `users/${member.scroller_id}`)).then((snapshot) => {
        if (!snapshot.exists()) {
          const fb_user_ref = ref(fb.database, "users/" + member.scroller_id);
          set(fb_user_ref, member.getAllProps());
        }
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}

/**
 *
 * @param {Member} member
 * @param {string} timestamp
 */
function pushTimestampIntoDB(member, timestamp) {
  push(ref(fb.database, `users/${member.scroller_id}/timestamps`), timestamp);
}

export { initFB, signInScroller, pushTimestampIntoDB };
