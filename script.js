let map;
let panorama;
let pegmanActive = false;

function loadGoogleMapsScript() {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&callback=initMap`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

function initMap() {
  const berlinTower = { lat: 52.520816, lng: 13.409417 };

  // Initialize the main map
  map = new google.maps.Map(document.getElementById("map"), {
    center: berlinTower,
    zoom: 15,
    streetViewControl: false,
  });

  // Prepare the panorama view but don't show it initially
  panorama = new google.maps.StreetViewPanorama(document.getElementById("map"), {
    position: berlinTower,
    pov: { heading: 34, pitch: 10 },
    visible: false,
  });

  map.setStreetView(panorama);

  // Pegman click activates next map click to open street view
  const pegmanButton = document.getElementById("pegman");
  if (pegmanButton) {
    pegmanButton.addEventListener("click", () => {
      pegmanActive = true;
      alert("Pegman active! Now click somewhere on the map to enter Street View.");
    });
  }

  const streetViewService = new google.maps.StreetViewService();

  // Click map to teleport to Street View
  map.addListener("click", (e) => {
    if (!pegmanActive) return;

    const clickedLocation = e.latLng;

    streetViewService.getPanorama(
      {
        location: clickedLocation,
        radius: 50,
      },
      (data, status) => {
        if (status === google.maps.StreetViewStatus.OK) {
          panorama.setPosition(data.location.latLng);
          panorama.setVisible(true);
        } else {
          alert("No Street View available here. Try somewhere nearby.");
        }

        pegmanActive = false;
      }
    );
  });
}

// Start loading the Maps API
loadGoogleMapsScript();
