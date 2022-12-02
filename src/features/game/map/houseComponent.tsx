import {InfoWindow, Marker} from "@react-google-maps/api";
import {QuestionComponent} from "./questionComponent";
import {useState} from "react";

interface HouseComponentProps {
    house: google.maps.places.PlaceResult;
}

export const HouseComponent = (props: HouseComponentProps) => {

    const [showInfo, setShowInfo] = useState(false);

    const houses = [
        "https://cdn.discordapp.com/attachments/1043586310159466536/1047944525152256000/maison1.png",
        "https://cdn.discordapp.com/attachments/1043586310159466536/1047948612258246676/maison1b.png",
        "https://cdn.discordapp.com/attachments/1043586310159466536/1047968750009335908/immeuble.png",
        // "https://cdn.discordapp.com/attachments/1043586310159466536/1047968816409354263/pharmacie.png",
    ]
    // convert a random string id to a number
    let id = props.house.place_id.split("").reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a
        }
        , 0);


    let url = houses[Math.abs(id) % houses.length];
    if (props.house.types.includes("hospital")|| props.house.types.includes("pharmacy") || props.house.types.includes("doctor") || props.house.types.includes("dentist")) {
        url = "https://cdn.discordapp.com/attachments/1043586310159466536/1047968816409354263/pharmacie.png";
    }
    const image = {
        url: url,
    }

    return <Marker
        position={{lat: props.house.geometry.location.lat(), lng: props.house.geometry.location.lng()}}
        onClick={() => setShowInfo(true)}
        icon={image}

    >
        {showInfo && <InfoWindow
            options={{pixelOffset: new google.maps.Size(0, -30)}}
            position={{lat: props.house.geometry.location.lat(), lng: props.house.geometry.location.lng()}}
            onCloseClick={() => setShowInfo(false)}
        >
            <QuestionComponent/>
        </InfoWindow>}
    </Marker>

}