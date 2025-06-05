function initMap() {
    // Center the map on Alexanderplatz, Berlin
    const alexanderplatz = { lat: 52.520816, lng: 13.409417 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: alexanderplatz,
    });

    // Add a marker at the TV tower
    new google.maps.Marker({
        position: alexanderplatz,
        map: map,
        title: "Fernsehturm Berlin"
    });
}
