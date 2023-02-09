export function updateProgress() {
  const progress = Math.floor(
    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
  );

  const progress_elem = document.getElementById("progress-bar");
  const navbar_elem = document.getElementById("navbar-elem");

  const widthValue = progress < 3 ? 0 : progress > 97 ? 94 : progress;

  progress_elem.style.width = `${widthValue}%`;
}
