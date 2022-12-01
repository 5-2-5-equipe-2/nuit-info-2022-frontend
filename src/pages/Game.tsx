import {GoogleMap, Marker, useJsApiLoader} from "@react-google-maps/api";
import React from "react";
import {useGeolocated} from "react-geolocated";
import mapGeneration from "../features/game/map/mapGeneration";


export const Game = () => {
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyD8grHFQALJcd-iB00Sv6MLw-Kdc5ILgnU",
    })
    const {coords, isGeolocationAvailable, isGeolocationEnabled} =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });


    const [map, setMap] = React.useState(null as google.maps.Map | null);

    const onLoad = React.useCallback(function callback(map: google.maps.Map) {
            mapGeneration(map);
            setMap(map)

        }
        , [])

    const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
            setMap(null)

        }
        , [])

    const userLocation = {lat: 51.507351, lng: -0.127758};

    // update user location to be the user's current location using geolocation
    const userMarker = <Marker position={userLocation
    }/>


    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={{
                height: "100vh",
                width: "100vw",

            }}
            zoom={8}
            center={userLocation}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {userMarker}
        </GoogleMap>
    ) : <></>


}

export default Game