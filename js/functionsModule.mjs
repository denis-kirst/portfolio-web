import { Member } from "./scrollerModule.mjs";
import {
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
  nav_link_elems,
} from "./variables.mjs";

/**
 * Calculate and update progress bar
 */
function updateProgress() {
  const progress = Math.floor(
    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
  );

  const widthValue = progress < 3 ? 0 : progress > 97 ? 94 : progress;

  progress_elem.style.width = `${widthValue}%`;
}

/**
 * expand navbar on click small screens
 */
function expandNavbarOnClick() {
  if (body_elem.offsetWidth <= SM_SCREEN_WIDTH) {
    if (nav_elem.classList.contains(EXPANDED_CLASS)) {
      hideNavbar();
    } else {
      expandNavbar();
    }
  }
}

/**
 * hide navbar
 */
function hideNavbar() {
  ul_elem.classList.remove(EXPANDED);
  nav_elem.classList.remove(EXPANDED_CLASS);
  icon_elem.classList.add(TRANSFORMED_CLASS);
}

/**
 * expand navbar
 */
function expandNavbar() {
  ul_elem.classList.add(EXPANDED);
  nav_elem.classList.add(EXPANDED_CLASS);
  icon_elem.classList.remove(TRANSFORMED_CLASS);
}

/**
 * changing pictures on click: about me section
 * @param {HTMLElement} about_me_li_elem
 */
function handleActiveListItem(about_me_li_elem) {
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

/**
 * intersection scrolling
 */
function useIntersectionObserver() {
  const sections = [...document.querySelectorAll("section")];

  let options = {
    rootMargin: "0px",
    threshold: 0.75,
  };

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      const { target } = entry;

      if (entry.intersectionRatio >= 0.75) {
        target.classList.add("is-visible");
        addActive(getIndexOfActiveNavItems(target.id));
        handleNavbarExpantion(target.id);
      } else {
        target.classList.remove("is-visible");
        removeActive(getIndexOfActiveNavItems(target.id));
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);

  //data-content attribute for each section with fade-in animation
  sections.forEach((section, index) => {
    const sectionChildren = [
      ...document.querySelector("[data-content]").children,
    ];

    sectionChildren.forEach((el, index) => {
      el.style.setProperty("--delay", `${index * 250}ms`);
    });

    observer.observe(section);
  });
}

/**
 * add "active" class in a list item
 * @param {number} i
 */
function addActive(i) {
  ul_elem.children[i].firstElementChild.classList.add(CLASS_ACTIVE);
}

/**
 * remove "active" class from a list item
 * @param {number} i
 */
function removeActive(i) {
  ul_elem.children[i].firstElementChild.classList.remove(CLASS_ACTIVE);
}

/**
 * get index of the active list item
 * @param {string} id
 * @returns {number}
 */
function getIndexOfActiveNavItems(id) {
  let i = 0;
  switch (id) {
    case "greetings":
      i = 0;
      break;
    case "about-me":
      i = 1;
      break;
    case "hard-skills":
      i = 2;
      break;
    case "soft-skills":
      i = 3;
      break;
    case "projects":
      i = 4;
      break;
    case "finish":
      i = 5;
      break;
  }
  return i;
}

/**
 * expand navbar on section scroll for large screens
 * @param {string} id
 */
function handleNavbarExpantion(id) {
  if (body_elem.offsetWidth > SM_SCREEN_WIDTH) {
    if (id === "greetings" && !nav_elem.classList.contains(EXPANDED_CLASS)) {
      hideNavbar();
    } else {
      expandNavbar();
    }
  } else {
    hideNavbar();
  }
}

/**
 *
 * @param {Member} member
 */
function useObserverForActiveClass(member) {
  let current;

  const callback = (mutationsList, observer) => {
    mutationsList.forEach((mutation) => {
      if (mutation.target.classList.contains("active")) {
        if (typeof current === "undefined") {
          current = mutation.target;
        }

        if (current.textContent !== mutation.target.textContent) {
          current = mutation.target;
          member.addTimestamp(current.innerHTML);
        }
      }
    });
  };

  const mutationObserver = new MutationObserver(callback);

  nav_link_elems.forEach((el) => {
    mutationObserver.observe(el, { attributes: true });
  });
}

export {
  useIntersectionObserver,
  handleActiveListItem,
  expandNavbarOnClick,
  updateProgress,
  useObserverForActiveClass,
};
