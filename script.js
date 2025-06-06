function loadGoogleMapsScript() {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&callback=initMap`;
  script.async = true;
  document.head.appendChild(script);
}

function initMap() {
  const berlin = { lat: 52.5200, lng: 13.4050 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: berlin,
  });

  new google.maps.Marker({
    position: berlin,
    map: map,
  });
}

// Kick things off
loadGoogleMapsScript();
