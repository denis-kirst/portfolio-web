let progress = 0;
let ready = true;

document.addEventListener("DOMContentLoaded", () => {
  const li_elems = document.querySelectorAll("li.nav-item");

  for (const li of li_elems) {
    li.style.display = "none";
  }

  window.addEventListener("scroll", function () {
    progress =
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
      100;

    updateProgress(Math.floor(progress));

    const nav_elems = document.querySelector(
      "nav.navbar.navbar-expand-lg.navbar-dark.fixed-top.navbar-shrink"
    );

    if (nav_elems) {
      for (const li of li_elems) {
        if (ready) {
          li.style.display = "block";
          li.classList.add("fade-in-animation");
        }
      }
    }
  });
});

function updateProgress(i) {
  const elem = document.getElementById("progress-bar");

  let widthValue = i < 3 ? 0 : i > 97 ? 97 : i;

  if (i > 97) {
  } else {
  }

  elem.style.width = widthValue + "%";
}
