function onLoad(map: google.maps.Map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    navigator.geolocation.getCurrentPosition(function (position) {
        // move map to user location
        if (map) {
            map.panTo(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
            // add marker to user location
            new window.google.maps.Marker({
                    position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                    map,
                    title: "You are here",
                }
            );
        // draw image on map
        const imageBounds = {
            north: position.coords.latitude + 0.1,
            south: position.coords.latitude - 0.1,
            east: position.coords.longitude + 0.1,
            west: position.coords.longitude - 0.1,
        };
        const image = {
            url: "https://github.com/milespratt/bingmaps-react/blob/master/src/assets/example.png?raw=true",
            scaledSize: new google.maps.Size(50, 50),
        };
        new google.maps.GroundOverlay(image.url, imageBounds).setMap(map);
        console.log(imageBounds);
        }
    }, function () {
        console.log("Error: The Geolocation service failed.");
    });

}

export default onLoad;