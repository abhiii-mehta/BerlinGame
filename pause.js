let hasStarted = false;

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") togglePause();
});

function togglePause() {
  const menu = document.getElementById("pauseMenu");
  isPaused = !isPaused;
  menu.style.display = isPaused ? "flex" : "none";

  if (isPaused) {
    pauseTimer();
  } else {
    resumeTimer();
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