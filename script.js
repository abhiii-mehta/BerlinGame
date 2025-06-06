window.isPaused = false;
let map, panorama, timerInterval;
let secondsElapsed = 0;
let finished = false;
let gameStarted = false;

const start = { lat: 52.5194, lng: 13.4265 }; // Strausberger Platz
const destination = { lat: 52.521918, lng: 13.413215 }; // Alexanderplatz

const playerName = localStorage.getItem("currentPlayer") || "Unknown";

function startTimer() {
  timerInterval = setInterval(() => {
    secondsElapsed++;
    const min = String(Math.floor(secondsElapsed / 60)).padStart(2, '0');
    const sec = String(secondsElapsed % 60).padStart(2, '0');
    document.getElementById("timer").textContent = `${min}:${sec}`;
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
}

function resumeTimer() {
  timerInterval = setInterval(() => {
    secondsElapsed++;
    const min = String(Math.floor(secondsElapsed / 60)).padStart(2, '0');
    const sec = String(secondsElapsed % 60).padStart(2, '0');
    document.getElementById("timer").textContent = `${min}:${sec}`;
  }, 1000);
}

function triggerCelebration() {
  const confetti = document.getElementById("confetti");
  confetti.style.display = "block";
  setTimeout(() => confetti.style.display = "none", 4000);
  if (navigator.vibrate) navigator.vibrate(300);

  const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");

  const existingEntryIndex = leaderboard.findIndex(entry => entry.name === playerName);

  if (existingEntryIndex !== -1) {
    if (secondsElapsed < leaderboard[existingEntryIndex].time) {
      leaderboard[existingEntryIndex].time = secondsElapsed;
    }
  } else {
    leaderboard.push({ name: playerName, time: secondsElapsed });
  }

  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}


function initMap() {
  document.getElementById("pauseMenu").style.display = "none";
  isPaused = false;

  map = new google.maps.Map(document.getElementById("map"), {
    center: start,
    zoom: 14,
    streetViewControl: false,
    mapTypeControl: false,
  });

  panorama = new google.maps.StreetViewPanorama(
    document.getElementById("map"),
    {
      position: start,
      pov: { heading: 0, pitch: 0 },
      zoom: 1,
      visible: true,
    }
  );

  map.setStreetView(panorama);

  google.maps.event.addListenerOnce(panorama, "visible_changed", () => {
  if (panorama.getVisible() && !gameStarted) {
    hasStarted = true;
    gameStarted = true;
    isPaused = false;
    document.getElementById("pauseMenu").style.display = "none";
    startTimer();
  }
});



  panorama.addListener("position_changed", () => {
    const currentPos = panorama.getPosition();
    const dist = google.maps.geometry.spherical.computeDistanceBetween(
      currentPos,
      new google.maps.LatLng(destination.lat, destination.lng)
    );

    document.getElementById("distanceLabel").textContent = `📍 ${Math.round(dist)}m away`;

    if (dist <= 200 && !finished) {
      clearInterval(timerInterval);
      finished = true;
      triggerCelebration();
      document.getElementById("feedback").textContent =
        `✅ You arrived in ${document.getElementById("timer").textContent}!`;
    }
  });
}

window.initMap = initMap;
