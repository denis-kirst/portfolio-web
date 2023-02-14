const EXPANDED_CLASS = "navbar--expanded";
const SM_SCREEN_WIDTH = 768;
const CLASS_ACTIVE = "active";

const nav_elem = document.getElementById("navbar-elem");
const li_elems = document.querySelectorAll("li.navbar__list-item");
const progress_elem = document.getElementById("progress-bar");
const ul_elem = document.getElementById("navbar-list-items");
const sections = document.querySelectorAll("section");
const body_elem = document.getElementById("page-top");
const EXPANDED = "navbar__list--expanded";

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
    const current_elem = ul_elem.children[i].firstChild;
    if (
      distances[i] === MIN &&
      !current_elem.classList.contains(CLASS_ACTIVE)
    ) {
      current_elem.classList.add(CLASS_ACTIVE);
    }
    if (distances[i] !== MIN && current_elem.classList.contains(CLASS_ACTIVE)) {
      current_elem.classList.remove(CLASS_ACTIVE);
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
}

function expandNavbar() {
  ul_elem.classList.add(EXPANDED);
  nav_elem.classList.add(EXPANDED_CLASS);
  nav_elem.style.top = "0";
}
