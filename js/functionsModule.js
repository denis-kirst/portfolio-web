const EXPANDED_CLASS = "navbar--expanded";
const SM_SCREEN_WIDTH = 768;
const CLASS_ACTIVE = "active";
const TRANSFORMED_CLASS = "close--transformed";
const EXPANDED = "navbar__list--expanded";
const LI_ITEM_ACTIVE_CLASS = "about-me__list-item--active";

const nav_elem = document.getElementById("navbar-elem");
const li_elems = document.querySelectorAll("li.navbar__list-item");
const progress_elem = document.getElementById("progress-bar");
const ul_elem = document.getElementById("navbar-list-items");
const sections = document.querySelectorAll("section");
const body_elem = document.getElementById("page-top");
const icon_elem = document.getElementById("close-icon");
const navbar_link_elems = document.querySelectorAll("a.navbar__link");
const about_me_ul_elem = document.getElementById("about-me-list");
const about_me_img_elem = document.getElementById("about-me-img");

/**
 * Calculate and update progress bar
 */
export function updateProgress() {
  const progress = Math.floor(
    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
  );

  const widthValue = progress < 3 ? 0 : progress > 97 ? 94 : progress;

  progress_elem.style.width = `${widthValue}%`;
}

export function scrollHandler() {
  const positions = calculatePositions(sections);
  const distances = calculateDistance(positions);

  const MIN = Math.min(...distances.filter((num) => num > 0));

  for (const i in distances) {
    if (
      distances[i] === MIN &&
      !navbar_link_elems[i].classList.contains(CLASS_ACTIVE)
    ) {
      navbar_link_elems[i].classList.add(CLASS_ACTIVE);
    }
    if (
      distances[i] !== MIN &&
      navbar_link_elems[i].classList.contains(CLASS_ACTIVE)
    ) {
      navbar_link_elems[i].classList.remove(CLASS_ACTIVE);
    }
  }
  navbarExpandOnScrollHandler();
}

/**
 * @param {Array<Number>} positions
 * @returns {Array<Number>}
 */
function calculateDistance(positions) {
  const SCROLL_WAY = window.scrollY - nav_elem.scrollHeight;
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

export function expandNavbarOnClick() {
  if (body_elem.offsetWidth <= SM_SCREEN_WIDTH) {
    if (nav_elem.classList.contains(EXPANDED_CLASS)) {
      hideNavbar();
    } else {
      expandNavbar();
    }
  }
}

function navbarExpandOnScrollHandler() {
  if (body_elem.offsetWidth > SM_SCREEN_WIDTH) {
    if (window.scrollY > 80) {
      expandNavbar();
      for (const li of li_elems) {
        li.style.opacity = "0.8";
      }
    } else {
      for (const li of li_elems) {
        li.style.opacity = "0";
      }
      nav_elem.classList.remove(EXPANDED_CLASS);
    }
  } else {
    hideNavbar();
  }
}

export function widthHandler() {
  for (const li of li_elems) {
    li.style.opacity = "0.8";
  }
  if (body_elem.offsetWidth > SM_SCREEN_WIDTH && window.scrollY > 80) {
    expandNavbar();
  } else {
    hideNavbar();
  }
}

function hideNavbar() {
  ul_elem.classList.remove(EXPANDED);
  nav_elem.classList.remove(EXPANDED_CLASS);
  nav_elem.style.top = `-${nav_elem.offsetHeight}px`;
  icon_elem.classList.add(TRANSFORMED_CLASS);
}

function expandNavbar() {
  ul_elem.classList.add(EXPANDED);
  nav_elem.classList.add(EXPANDED_CLASS);
  nav_elem.style.top = "0";
  icon_elem.classList.remove(TRANSFORMED_CLASS);
}

/**
 * @param {HTMLElement} about_me_li_elem
 */
export function handleActiveListItem(about_me_li_elem) {
  for (const li of about_me_ul_elem.children) {
    if (about_me_li_elem.className === LI_ITEM_ACTIVE_CLASS) {
      return;
    }
  }

  for (const li of about_me_ul_elem.children) {
    li.classList.remove(LI_ITEM_ACTIVE_CLASS);
  }

  about_me_li_elem.classList.add(LI_ITEM_ACTIVE_CLASS);

  switch (about_me_li_elem.getAttribute("id")) {
    case "list-item-1":
      about_me_img_elem.src = "./assets/img/li-1.jpg";
      break;
    case "list-item-2":
      about_me_img_elem.src = "./assets/img/li-2.jpg";
      break;
    case "list-item-3":
      about_me_img_elem.src = "./assets/img/li-3.jpg";
      break;
    case "list-item-4":
      about_me_img_elem.src = "./assets/img/li-4.jpg";
      break;
  }
}
