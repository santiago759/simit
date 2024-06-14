// JavaScript to handle map functionality and other interactions
document.addEventListener("DOMContentLoaded", function() {
    // Initialize the map
    function initMap() {
        var mapOptions = {
            center: new google.maps.LatLng(4.7110, -74.0721),
            zoom: 10,
        };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        // Add markers to the map
        var markers = [
            { position: { lat: 4.7110, lng: -74.0721 }, title: 'Punto de pago 1' },
            { position: { lat: 4.6510, lng: -74.0821 }, title: 'Punto de pago 2' },
            { position: { lat: 4.7010, lng: -74.0621 }, title: 'Punto de pago 3' }
        ];

        markers.forEach(function(marker) {
            new google.maps.Marker({
                position: marker.position,
                map: map,
                title: marker.title
            });
        });
    }
    initMap();
});
