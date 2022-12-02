import {GoogleMap, Marker, useJsApiLoader} from "@react-google-maps/api";
import React, {useEffect, useState} from "react";
import {useGeolocated} from "react-geolocated";
import mapGeneration from "../features/game/map/mapGeneration";
import {drawHouses} from "../features/game/map/dataCollection";
import {ProgressBar} from "../features/game/map/ProgressBar";
import {CircularProgress, LinearProgress} from "@mui/material";
import {isAuthenticated} from "../features/auth/utils";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {Navigate} from "react-router-dom";
import {startGame} from "../features/game/map/service";
import {useAppSelector} from "../hooks";


export const Game = () => {
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyD8grHFQALJcd-iB00Sv6MLw-Kdc5ILgnU",
        libraries: ['places', 'geometry'],
    })
    const auth = useAppSelector(state => state.auth)
    const {coords, isGeolocationAvailable, isGeolocationEnabled} =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: true,
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
    // jsxHouses is an array of houses that are rendered on the map as a state
    const [jsxHouses, setJsxHouses] = useState([] as JSX.Element[]);
    startGame({
        token: auth.access,
    }).then((response) => {
        console.log(response);
    }).catch((error) => {

    })
    useEffect(() => {

        console.log(coords);
        if (map && isLoaded && coords && isGeolocationAvailable && isGeolocationEnabled) {
            drawHouses(map, coords.latitude, coords.longitude).then((houses) => {
                setJsxHouses(houses);
            })
            map.fitBounds({
                north: coords.latitude + 0.005,
                south: coords.latitude - 0.005,
                east: coords.longitude + 0.005,
                west: coords.longitude - 0.005

            })
            map.panTo({lat: coords.latitude, lng: coords.longitude});


        }
    }, [map, isLoaded, coords, isGeolocationAvailable, isGeolocationEnabled])
    if (!isAuthenticated(useSelector((state: RootState) => state.auth))) {
        return <Navigate to="/login"/>
    }
    return isLoaded && isGeolocationAvailable ? (
        <>
            {
                (jsxHouses.length === 0) ? <LinearProgress
                    sx={{
                        height: "5vh",
                    }}
                /> : <ProgressBar/>
            }
            <GoogleMap
                mapContainerStyle={{
                    height: "90vh",
                    width: "100vw"

                }}
                center={coords ? {lat: coords.latitude, lng: coords.longitude} : userLocation}
                onLoad={onLoad}
                onUnmount={onUnmount}
                zoom={15}
                options={{
                    disableDefaultUI: true,
                    zoomControl: true,
                    // remove default icons
                    styles: [
                        {
                            featureType: "poi",
                            elementType: "labels",
                            stylers: [
                                {
                                    visibility: "off",
                                },
                            ],
                        },
                    ],
                }}
            >
                {jsxHouses.map((house, index) =>
                    < div key={index}>{house}</div>
                )}
            </GoogleMap>
        </>
    ) : <CircularProgress/>;


}

export default Game