function loadGoogleMapsScript() {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&callback=initMap`;
  script.async = true;
  document.head.appendChild(script);
}
function initMap() {
const startLocation = { lat: 52.521328, lng: 13.409760 };

  const map = new google.maps.Map(document.getElementById("map"), {
    center: startLocation,
    zoom: 15,
  });

  const panorama = new google.maps.StreetViewPanorama(
    document.getElementById("map"), {
      position: startLocation,
      pov: {
        heading: 270,
        pitch: 0
      },
      zoom: 1
    });

  map.setStreetView(panorama);
}

loadGoogleMapsScript();
