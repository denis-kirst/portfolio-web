import { Member } from "./scrollerModule.mjs";
import { AboutMe } from "./aboutMeModel.mjs";
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
  nav_link_elems,
  about_me_radio_buttons,
  soft_skills_list_item_elems,
  soft_skills_radio_buttons,
  soft_skills_ul_elem,
} from "./variables.mjs";
import { SoftSkills } from "./softSkillsModel.mjs";

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
 * @param {HTMLElement} li_elem
 * @param {AboutMe | SoftSkills} model
 */
function handleActiveListItem(li_elem, model) {
  if (li_elem.className === LI_ITEM_ACTIVE_CLASS) {
    return;
  }

  const i = getContentIndex(li_elem.getAttribute("id"));

  if (li_elem.parentElement.id === "about-me-list") {
    for (const li of about_me_ul_elem.children) {
      li.classList.remove(LI_ITEM_ACTIVE_CLASS);
    }
    for (const button of about_me_radio_buttons) {
      button.checked = false;
    }
    about_me_radio_buttons[i].checked = true;
  } else {
    for (const li of soft_skills_list_item_elems) {
      li.classList.remove(LI_ITEM_ACTIVE_CLASS);
    }
    for (const button of soft_skills_radio_buttons) {
      button.checked = false;
    }
    soft_skills_radio_buttons[i].checked = true;
  }

  li_elem.classList.add(LI_ITEM_ACTIVE_CLASS);

  model.current_content = model.getContentOnIndex(i);
}

/**
 * @param {string} identicator
 * @returns {number}
 */
function getContentIndex(identicator) {
  switch (identicator) {
    case "list-item-1":
      return 0;
    case "list-item-2":
      return 1;
    case "list-item-3":
      return 2;
    case "list-item-4":
      return 3;
    case "list-item-5":
      return 4;
    default:
      return 0;
  }
}

/**
 * @param {AboutMe | SoftSkills} model
 * @param {string} identicator
 */
function radioButtonsHandler(model, identicator) {
  const i = getContentIndex(identicator);
  if (model instanceof AboutMe) {
    for (const li of about_me_ul_elem.children) {
      li.classList.remove(LI_ITEM_ACTIVE_CLASS);
    }
    about_me_ul_elem.children[i].classList.add(LI_ITEM_ACTIVE_CLASS);
  } else {
    for (const li of soft_skills_list_item_elems) {
      li.classList.remove(LI_ITEM_ACTIVE_CLASS);
    }
    soft_skills_list_item_elems[i].classList.add(LI_ITEM_ACTIVE_CLASS);
  }

  model.current_content = model.getContentOnIndex(i);
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
  radioButtonsHandler,
};
