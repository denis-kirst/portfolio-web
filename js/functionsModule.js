/**
 * Calculate and update progress bar
 */
export function updateProgress() {
  const progress = Math.floor(
    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
  );

  const progress_elem = document.getElementById("progress-bar");

  const widthValue = progress < 3 ? 0 : progress > 97 ? 94 : progress;

  progress_elem.style.width = `${widthValue}%`;
}

/**
 * scrollHandler for navigation
 */
export function scrollHandler() {
  const EXPANDED_CLASS = "navbar--expanded";
  const nav_elem = document.getElementById("navbar-elem");
  const ul_elem = document.getElementById("navbar-list-items");
  const li_elems = document.querySelectorAll("li.navbar__list-item");
  const sections = document.querySelectorAll("section");
  const positions = calculatePositions(sections);
  const distances = calculateDistance(positions);
  const CLASS_ACTIVE = "active";

  const MIN = Math.min(...distances.filter((num) => num > 0));

  for (const i in distances) {
    if (window.scrollY > 80) {
      nav_elem.classList.add(EXPANDED_CLASS);
      for (const li of li_elems) {
        li.style.opacity = "0.8";
      }
    } else {
      for (const li of li_elems) {
        li.style.opacity = "0";
      }
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
