const NEW_SCROLLER = "new-scroller";
const SCROLLER_ID = "scroller-id";

function initLocalStorage(member) {
  if (localStorage.getItem(NEW_SCROLLER) === null) {
    localStorage.setItem(NEW_SCROLLER, JSON.stringify(member));
    return true;
  } else {
    return false;
  }
}

function updateLocalStorage(member) {
  localStorage.removeItem(NEW_SCROLLER);
  localStorage.setItem(NEW_SCROLLER, JSON.stringify(member));
}

export { initLocalStorage, updateLocalStorage };
