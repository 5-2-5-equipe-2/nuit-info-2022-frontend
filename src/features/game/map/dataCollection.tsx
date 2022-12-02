import {InfoWindow, Marker} from "@react-google-maps/api";
import {QuestionComponent} from "./questionComponent";
import {HouseComponent} from "./houseComponent";

export const getMapData = async (map: google.maps.Map, lat: number, lng: number) => {
    // get map data of houses, parks, etc.
    const service = new google.maps.places.PlacesService(map);
    const request = {
        location: new google.maps.LatLng(lat, lng),
        rankBy: google.maps.places.RankBy.DISTANCE,
        // radius: 200,
        type: [
            "park",
            "school",
            "hospital",
            "university",
            "library",
            "museum",
            "church",
            "synagogue",
            "mosque",
            "hindu_temple",
            "zoo",
            "amusement_park",
            "aquarium",
            "stadium",
            "gym",
            "spa",
        ]
    };

    // get data with async await
    return await new Promise((resolve, reject) => {
            service.nearbySearch(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    console.log(results);
                    console.log(status);
                    resolve(results);
                } else {
                    reject(status);
                }
            });
        }
    );
}

export const drawHouses = async (map: google.maps.Map, lat: number, lng: number) => {
    // draw houses on map
    let places = await getMapData(map, lat, lng);
    let gridSize = 2;
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            places = places.concat(await getMapData(map, lat + (i - gridSize / 2) * 0.005, lng + (j - gridSize / 2) * 0.005).catch(e => console.log(e)));
            console.log(places);
            // wait 2 seconds to prevent google api limit
            await new Promise(r => setTimeout(r, 2000));
            console.log("waited 2 seconds");
        }
    }

    let renderedHouses = [];
    let jsxHouses = [];

    for (let i = 0; i < places.length; i++) {
        // check if place is not close to the other places
        let render = true;
        for (let j = 0; j < renderedHouses.length; j++) {
            if (google.maps.geometry.spherical.computeDistanceBetween(places[i].geometry.location, renderedHouses[j].geometry.location) < 100) {
                render = false;
                break;
            }
        }
        if (render) {
            renderedHouses.push(places[i]);
            let place = places[i];
            let marker = <HouseComponent house={place}/>;
            jsxHouses.push(marker);
        }
    }
    return jsxHouses;
}
