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
const ACTIVE_ELEM_SELECTOR = "a.active";
const EXPANDED_CLASS = "navbar--expanded";
const SM_SCREEN_WIDTH = 768;
const CLASS_ACTIVE = "active";
const TRANSFORMED_CLASS = "close--transformed";
const EXPANDED = "navbar__list--expanded";
const LI_ITEM_ACTIVE_CLASS = "about-me__list-item--active";

const nav_elem = document.getElementById("navbar-elem");
const progress_elem = document.getElementById("progress-bar");
const ul_elem = document.getElementById("navbar-list-items");
const body_elem = document.getElementById("page-top");
const icon_elem = document.getElementById("close-icon");
const about_me_ul_elem = document.getElementById("about-me-list");
const about_me_img_elem = document.getElementById("about-me-img");
const navbar_expand_elem = document.getElementById("navbar-expand-button");
const nav_link_elems = document.querySelectorAll("a.navbar__link");
const about_me_list_item_elems = document.querySelectorAll(
  "li.about-me__list-item"
);
const about_me_radio_buttons = document.getElementsByName("about-me-pics");

export {
  ACTIVE_ELEM_SELECTOR,
  firebaseConfig,
  EXPANDED_CLASS,
  SM_SCREEN_WIDTH,
  CLASS_ACTIVE,
  TRANSFORMED_CLASS,
  EXPANDED,
  LI_ITEM_ACTIVE_CLASS,
  nav_elem,
  progress_elem,
  ul_elem,
  body_elem,
  icon_elem,
  about_me_ul_elem,
  about_me_img_elem,
  navbar_expand_elem,
  nav_link_elems,
  about_me_list_item_elems,
  about_me_radio_buttons,
};
