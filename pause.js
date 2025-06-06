let isPaused = false;
let hasStarted = false;

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") togglePause();
});

function togglePause() {
  const menu = document.getElementById("pauseMenu");
  isPaused = !isPaused;
  menu.style.display = isPaused ? "flex" : "none";

  if (isPaused) {
    pauseTimer();     // Defined in script.js
  } else {
    resumeTimer();    // Defined in script.js
  }
}
function resumeGame() {
  togglePause();
}


function restartGame() {
  location.reload();
}

function goToMainMenu() {
  location.href = "menu.html";
}
