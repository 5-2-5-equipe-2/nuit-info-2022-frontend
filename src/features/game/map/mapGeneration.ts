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

        }
    }, function () {
        console.log("Error: The Geolocation service failed.");
    });

}

export default onLoad;