export const getMapData = async (map: google.maps.Map, lat: number, lng: number) => {
    // get map data of houses, parks, etc.
    const service = new google.maps.places.PlacesService(map);
    const request = {
        location: new google.maps.LatLng(lat, lng),
        rankBy: google.maps.places.RankBy.DISTANCE,
        // radius: 200,
        type : [
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

    for (let i = 0; i < 1; i++) {
        for (let j = 0; j < 1; j++) {
            places = places.concat(await getMapData(map, lat + i * 0.01, lng + j * 0.01).catch(e => console.log(e)));
            console.log(places);
            // wait 2 seconds to prevent google api limit
            await new Promise(r => setTimeout(r, 1000));
            console.log("waited 2 seconds");
        }
    }



    for (let i = 0; i < places.length; i++) {
        // check if place is not close to the other places
        let render = true;
        // for (let j = 0; j < places.length; j++) {
        //     if (i !== j) {
        //         if (google.maps.geometry.spherical.computeDistanceBetween(places[i].geometry.location, places[j].geometry.location) < 10) {
        //             render = false;
        //             break;
        //         }
        //     }
        // }


        if (render) {
            let place = places[i];
            // render image of house on map with constant size
            let image = {
                url: "https://cdn.discordapp.com/attachments/1043586310159466536/1047944525152256000/maison1.png",
                // size: new google.maps.Size(71, 71),
                // origin: new google.maps.Point(0, 0),
                // anchor: new google.maps.Point(17, 34),
                // scaledSize: new google.maps.Size(40, 40)
            };
            // create marker for housem must scale to the map
            let marker = new google.maps.Marker({
                map: map,
                icon: image,
                title: place.name,
                position: place.geometry.location
            });

            // add info window to marker
            let infowindow = new google.maps.InfoWindow();
            google.maps.event.addListener(marker, 'click', function () {

                    // content of info window with house data (name, address, etc.) and button to add house to list of houses to visit
                    infowindow.setContent("<div><strong>" + place.name + "</strong><br>" +
                        "Place ID: " + place.place_id + "<br>" +
                        place.vicinity + "<br>" +
                        "<button onclick='addHouseToVisit(\"" + place.place_id + "\")'>Add to list</button>" +
                        "</div>");

                    infowindow.open(map, this);

                }
            );
        }
    }
}


export const getHouses = () => {
    // pull data from dan api

}


