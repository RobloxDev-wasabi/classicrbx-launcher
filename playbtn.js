// === CONFIG ===
const launcherBaseURL = "https://RobloxDev-wasabi.github.io/classicrbx-launcher"; // Replace with your GitHub username

// === PLAY BUTTON SETUP ===
document.addEventListener("DOMContentLoaded", () => {
  const playBtn = document.querySelector("img[src*='image304.png']"); // Replace with your actual Play button image filename

  if (playBtn) {
    playBtn.style.cursor = "pointer";

    playBtn.addEventListener("click", () => {
      const gameName = "default-place-testing-1"; // You can make this dynamic later
      const launcherURL = `${launcherBaseURL}/?game=${encodeURIComponent(gameName)}`;
      window.open(launcherURL, "_blank");
    });
  }
});
