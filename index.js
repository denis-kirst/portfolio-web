import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
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
import { firebaseConfig, ACTIVE_ELEM_SELECTOR } from "./js/variables.js";
import { Member } from "./js/scrollerModule.js";
import {
  updateProgress,
  expandNavbarOnClick,
  handleActiveListItem,
  useIntersectionObserver,
} from "./js/functionsModule.js";

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
        const fb_user_ref = ref(database, "users/" + new_member.scroller_id);
        set(fb_user_ref, new_member.getAllProps());
      }
    });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

document.addEventListener("DOMContentLoaded", () => {
  useIntersectionObserver();

  let current;

  const navbar_expand_elem = document.getElementById("navbar-expand-button");
  const nav_link_elems = document.querySelectorAll("a.navbar__link");
  const about_me_list_item_elems = document.querySelectorAll(
    "li.about-me__list-item"
  );

  const mutationObserver = new MutationObserver(actionClassCallback);

  function actionClassCallback(mutationsList, observer) {
    mutationsList.forEach((mutation) => {
      if (mutation.target.classList.contains("active")) {
        if (typeof current === "undefined") {
          current = mutation.target;
        }

        if (current.textContent !== mutation.target.textContent) {
          current = mutation.target;
          new_member.addTimestamp(current.innerHTML);
        }
      }
    });
  }

  /**
   * expand or hide mobile navbar
   */
  navbar_expand_elem.addEventListener("click", () => {
    expandNavbarOnClick();
  });

  nav_link_elems.forEach((el) => {
    mutationObserver.observe(el, { attributes: true });
  });

  about_me_list_item_elems.forEach((li) =>
    li.addEventListener("click", (event) => {
      handleActiveListItem(event.target);
    })
  );

  new_member.on("add-timestamp", (timestamp) => {
    push(
      ref(database, `users/${new_member.scroller_id}/timestamps`),
      timestamp
    );
  });
});
