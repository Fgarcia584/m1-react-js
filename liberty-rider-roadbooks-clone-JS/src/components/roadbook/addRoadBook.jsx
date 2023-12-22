import Map, { Marker, NavigationControl, Source, Layer } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import polyline from "@mapbox/polyline";
import { useState, useMemo, useEffect, useContext } from "react";
import { Loader } from "google-maps";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase';
import { AuthContext } from "../../contexts/authContext"


const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;


const loader = new Loader(GOOGLE_API_KEY);
const google = await loader.load();
const directionsService = new google.maps.DirectionsService();
const geocoder = new google.maps.Geocoder();


const AddRoadBook = () => {

    const currentUser = useContext(AuthContext);

    const [roadbook, setRoadbook] = useState({});

    // const roadBooksCollection = collection(db, "roadbooks");

    const [roadbookSteps, setRoadbookSteps] = useState([]);
    const [route, setRoute] = useState();

    const [distance, setDistance] = useState(0);
    const [duration, setDuration] = useState(0);

    const [roadbookName, setRoadbookName] = useState("");

    const [location, setLocation] = useState({
        city: "",
        country: "",
        region: "",
        state: "",
    });

    let tmp_distance = 0;
    let tmp_duration = 0;

    const mapTilerMapStyle = useMemo(() => {
        return `https://api.maptiler.com/maps/basic-v2/style.json?key=${MAPTILER_API_KEY}`;
    }, []);


    const MAPS_DEFAULT_LOCATION = {
        latitude: 44.8638099,
        longitude: -0.6684131,
        zoom: 12,
    };

    const onMapClick = (event) => {
        setRoadbookSteps([...roadbookSteps, { latitude: event.lngLat.lat, longitude: event.lngLat.lng }]);
    };

    useEffect(() => {

        if (roadbookSteps.length > 1) {
            geocoder.geocode({ location: new google.maps.LatLng(roadbookSteps[0].latitude, roadbookSteps[0].longitude) }, (result, status) => {
                if (status == google.maps.GeocoderStatus.OK) {
                    setLocation({
                        city: result[0].address_components[1].long_name,
                        country: result[0].address_components[2].long_name,
                        region: result[0].address_components[3].long_name,
                        state: result[0].address_components[4].long_name,
                    });

                }
            });
        }

        if (roadbookSteps.length > 1) {
            const origin = roadbookSteps[0];
            const destination = roadbookSteps[roadbookSteps.length - 1];
            const waypoints = roadbookSteps.slice(1, roadbookSteps.length - 1).map((step) => {
                return { location: new google.maps.LatLng(step.latitude, step.longitude) };
            });
            const request = {
                origin: new google.maps.LatLng(origin.latitude, origin.longitude),
                destination: new google.maps.LatLng(destination.latitude, destination.longitude),
                waypoints,
                travelMode: google.maps.TravelMode.DRIVING,
            };
            directionsService.route(request, (result, status) => {
                if (status == google.maps.DirectionsStatus.OK) {
                    setRoute(polyline.toGeoJSON(result.routes[0].overview_polyline));
                    for (let i = 0; i < result.routes[0].legs.length; i++) {
                        tmp_duration += result.routes[0].legs[i].duration.value;
                        tmp_distance += result.routes[0].legs[i].distance.value;
                    }
                    setDuration(tmp_duration);
                    setDistance(tmp_distance);
                }
            });
        }

    }, [roadbookSteps]);

    const onnamechange = (event) => {
        setRoadbookName(event.target.value);
    }

    const submitRoadbook = async () => {

        if (roadbookName == "") {
            alert("Veuillez donner un nom à votre itinéraire");
            return;
        }

        const level = distance / 1000 < 80 ? "Débutant" : distance / 1000 < 150 ? "Intermédiaire" : "Avancé";

        setRoadbook({
            ...roadbook,
            title: roadbookName,
            distance: distance,
            duration: duration,
            suggested_level: level,
            steps: roadbookSteps,
            owner_uid: currentUser.state.userInfos.uid,
            owner: currentUser.state.userInfos.displayName,
            owner_photo_url: currentUser.state.userInfos.photoURL,
            description: "reh  ethvr  tyrhythrh hterhh ",
            created_at: serverTimestamp(),
            city: location.city,
            country: location.country,
            region: location.region,
            state: location.state,
        });

        await addDoc(collection(db, 'roadbooks'), {
            title: roadbook.title,
            distance: roadbook.distance,
            duration: roadbook.duration,
            suggested_level: roadbook.suggested_level,
            steps: roadbook.steps,
            owner_uid: roadbook.owner_uid,
            owner: roadbook.owner,
            owner_photo_url: roadbook.owner_photo_url,
            description: roadbook.description,
            created_at: roadbook.created_at,
            city: roadbook.city,
            country: roadbook.country,
            region: roadbook.region,
            state: roadbook.state,
        }).then((docRef) => {
            console.log("Document written with ID: ", docRef);
        }).catch((error) => {
            console.error("Error adding document: ", error);
        }
        );

    }

    useEffect(() => {
        // console.log(roadbook);
    }, [roadbook]);

    return (
        <div className="flex ">
            <div className="w-[300px] h-[calc(100vh-64px)] ">
                <div className="flex px-1 flex-col">

                    {roadbookSteps.length == 0 && (
                        <div className="h-[calc(100vh-64px)]">
                            <h1 className="text-xl font-bold text-[22px] font-bold">Créer un itinéraire</h1>
                            <div className="flex flex-col items-center justify-center">
                                <div className="mt-[20px] pt-[20px] px-[60px]">Ajoute ta première étape en cliquant sur la carte.</div>
                                <div className="text-center text-base font-bold mt-4">ou</div>
                                <div className=" my-2 py-6">
                                    <div className="btn btn-primary text-white btn-sm">Importe un GPX</div>
                                </div>
                            </div>
                            <div className="p-5 bg-zinc-700 rounded-lg w-[292px]">
                                <h2 className="text-white text-left my-4 font-bold text-lg">Prépare</h2>
                                <p className="text-white text-left">Prépare ton voyage moto en plaçant les points sur la carte ou en important une trace GPX. Ta route est tracée en quelques clics.</p>
                                <h2 className="text-white text-left my-4 font-bold text-lg">Enregistre</h2>
                                <p className="text-white text-left">Retrouve tous tes itinéraires dans ton compte et dans l’app Liberty Rider. C’est simple et gratuit. Tu peux planifier autant de balades que tu veux.</p>
                                <h2 className="text-white text-left my-4 font-bold text-lg">Lance le guidage</h2>
                                <p className="text-white text-left">Liberty Rider et son app GPS spécial moto te guide sur le tracé. Tu peux aussi exporter en GPX pour les Tomtom Rider et Garmin Zumo.</p>
                            </div>
                        </div>
                    )}
                    {roadbookSteps.length > 0 && (

                        <div className="flex flex-col w-[300px]">
                            <div className="flex flex-row items-center justify-around">
                                <div className="flex flex-row items-center">
                                    <button className="btn btn-primary text-white btn-sm ml-2" onClick={() => document.getElementById('my_modal_3').showModal()}>Exporter</button>
                                    <dialog id="my_modal_3" className="modal ">
                                        <div className="modal-box pt-[10em] px-[3em] min-w-[50vw] min-h-[50vh] rounded-none">
                                            <form method="dialog">
                                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                            </form>
                                            <h3 className="font-bold text-2xl">Enregistre ton itinéraire</h3>
                                            <p className="py-4">Donne-lui un nom et rend-toi dans le GPS de l'app pour le lancer directement</p>
                                            <input type="text" value={roadbookName} onChange={onnamechange} className="input input-bordered w-full "></input>
                                            <div className="flex flex-row-reverse pt-4">
                                                <div className="btn btn-primary px-6 mx-4 text-white rounded-full" onClick={submitRoadbook}>Exporter</div>
                                                <button className="btn px-6 mx-4 text-white rounded-full text-zinc-950">Annuler</button>
                                            </div>
                                        </div>
                                    </dialog>
                                    <div className="btn btn-primary text-white btn-sm ml-2">Actions</div>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                {roadbookSteps.map((step, index) => {
                                    return (
                                        <div key={index} className="flex flex-row items-center justify-between px-2">
                                            <div className="text-base text-[22px] font-bold">{index + 1}</div>
                                            <div className="text-base text-[22px] font-bold">{parseFloat(step.latitude).toFixed(4)}, {parseFloat(step.longitude).toFixed(4)}</div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="w-full bg-neutral-100 px-3 my-3">Tu peux placer jusqu’à 25 étapes.</div>
                            <div className="flex flex-row items-center justify-around">
                                <div className="text-base text-[14px] ">{Math.floor(duration / 3600)}h{Math.round(duration % 60)} - {Math.round((distance / 1000))} km</div>
                            </div>
                        </div>

                    )}




                </div>
            </div>
            <div className="w-full">
                <Map
                    initialViewState={{
                        ...MAPS_DEFAULT_LOCATION,
                    }}
                    hash
                    mapLib={maplibregl}
                    mapStyle={mapTilerMapStyle}
                    onClick={onMapClick}
                >
                    <NavigationControl />
                    {roadbookSteps.length > 0 && roadbookSteps.map((step, index) => {
                        return (
                            <Marker key={index} longitude={step.longitude} latitude={step.latitude}>
                            </Marker>
                        )
                    }
                    )}
                    {route && (
                        <>
                            <Source id="polylineLayer" type="geojson" data={route}>
                                <Layer
                                    id="lineLayer"
                                    type="line"
                                    source="my-data"
                                    layout={{
                                        "line-join": "round",
                                        "line-cap": "round",
                                    }}
                                    paint={{
                                        "line-color": "rgba(3, 170, 238, 0.5)",
                                        "line-width": 5,
                                    }}
                                />
                            </Source>
                        </>
                    )}
                </Map>
            </div>
        </div>
    )

}

export default AddRoadBook