import { Member } from "./js/scrollerModule.mjs";
import { AboutMe } from "./js/aboutMeModel.mjs";
import {
  updateProgress,
  expandNavbarOnClick,
  handleActiveListItem,
  useIntersectionObserver,
  useObserverForActiveClass,
  aboutMeRadioButtonsHandler,
} from "./js/functionsModule.mjs";
import {
  initFB,
  signInScroller,
  pushTimestampIntoDB,
} from "./js/firebaseModule.mjs";
import {
  navbar_expand_elem,
  about_me_list_item_elems,
  about_me_img_elem,
  about_me_radio_buttons,
} from "./js/variables.mjs";

const new_member = new Member();

// Hi =) I need timestamps to get better with sections of my portfolio
// I don't know who you are and where are you from
// All users are anonymous. Each user has own timestamps
// no worries, c u <3
initFB();
signInScroller(new_member);

document.addEventListener("DOMContentLoaded", () => {
  const about_me = new AboutMe(about_me_img_elem.src);

  useIntersectionObserver();
  useObserverForActiveClass(new_member);

  /**
   * expand or hide mobile navbar
   */
  navbar_expand_elem.addEventListener("click", () => {
    expandNavbarOnClick();
  });

  about_me_radio_buttons.forEach((el) => {
    el.addEventListener("change", (event) => {
      aboutMeRadioButtonsHandler(about_me, event.target.value);
    });
  });

  about_me.on("new-pic", () => {
    about_me_img_elem.src = about_me.current_pic;
  });

  about_me_list_item_elems.forEach((li) =>
    li.addEventListener("click", (event) => {
      handleActiveListItem(event.target, about_me);
    })
  );

  new_member.on("add-timestamp", (timestamp) => {
    pushTimestampIntoDB(new_member, timestamp);
  });
});
