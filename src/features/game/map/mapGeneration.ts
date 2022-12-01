import {drawHouses, getMapData} from "./dataCollection";

function onLoad(map: google.maps.Map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    navigator.geolocation.getCurrentPosition(async function (position) {
        // move map to user location
        if (map) {
            map.panTo(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
            await drawHouses(map, position.coords.latitude, position.coords.longitude).then(r => console.log(r));
            map.setZoom(17);
        }
    }, function () {
        console.log("Error: The Geolocation service failed.");
    });

}

export default onLoad;