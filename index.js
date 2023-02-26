import { Member } from "./js/scrollerModule.mjs";
import {
  updateProgress,
  expandNavbarOnClick,
  handleActiveListItem,
  useIntersectionObserver,
  useObserverForActiveClass,
} from "./js/functionsModule.mjs";
import {
  initFB,
  signInScroller,
  pushTimestampIntoDB,
} from "./js/firebaseModule.mjs";
import {
  navbar_expand_elem,
  about_me_list_item_elems,
} from "./js/variables.mjs";

const new_member = new Member();

// Hi =) I need timestamps to get better with sections of my portfolio
// I don't know who you are and where are you from
// All users are anonymous. Each user has own timestamps
// no worries, c u <3
initFB();
signInScroller(new_member);

document.addEventListener("DOMContentLoaded", () => {
  useIntersectionObserver();
  useObserverForActiveClass(new_member);

  /**
   * expand or hide mobile navbar
   */
  navbar_expand_elem.addEventListener("click", () => {
    expandNavbarOnClick();
  });

  about_me_list_item_elems.forEach((li) =>
    li.addEventListener("click", (event) => {
      handleActiveListItem(event.target);
    })
  );

  new_member.on("add-timestamp", (timestamp) => {
    pushTimestampIntoDB(new_member, timestamp);
  });
});
