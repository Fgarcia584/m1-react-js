import Map, { Marker, NavigationControl, Source, Layer } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import polyline from "@mapbox/polyline";
import { useState, useMemo, useEffect } from "react";
import { Loader } from "google-maps";

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;


const loader = new Loader(GOOGLE_API_KEY);
const google = await loader.load();
const directionsService = new google.maps.DirectionsService();


const AddRoadBook = () => {

    const [roadbookSteps, setRoadbookSteps] = useState([]);
    const [route, setRoute] = useState();

    const mapTilerMapStyle = useMemo(() => {
        return `https://api.maptiler.com/maps/basic-v2/style.json?key=${MAPTILER_API_KEY}`;
    }, []);


    const MAPS_DEFAULT_LOCATION = {
        latitude: 44.8638099,
        longitude: -0.6684131,
        zoom: 12,
    };

    const onMapClick = (event) => {
        console.log("event", event.lngLat);
        setRoadbookSteps([...roadbookSteps, { latitude: event.lngLat.lat, longitude: event.lngLat.lng }]);
    };

    useEffect(() => {
        // console.log("roadbookSteps", roadbookSteps
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

            console.log("request", request);
            directionsService.route(request, (result, status) => {
                if (status == google.maps.DirectionsStatus.OK) {
                    setRoute(polyline.toGeoJSON(result.routes[0].overview_polyline));
                    console.log("result", result);
                }
            });
        }

    }, [roadbookSteps]);

    return (
        <div className="flex ">
            <div className="w-[300px] h-full">
                <div className="flex px-1 flex-col">
                    <h1 className="text-xl font-bold">Créer un itinéraire</h1>
                    <div className="p-5 bg-zinc-700 rounded-lg w-[292px]">
                        <h2 className="text-white text-left my-4 font-bold text-lg">Prépare</h2>
                        <p className="text-white text-left">Prépare ton voyage moto en plaçant les points sur la carte ou en important une trace GPX. Ta route est tracée en quelques clics.</p>
                        <h2 className="text-white text-left my-4 font-bold text-lg">Enregistre</h2>
                        <p className="text-white text-left">Retrouve tous tes itinéraires dans ton compte et dans l’app Liberty Rider. C’est simple et gratuit. Tu peux planifier autant de balades que tu veux.</p>
                        <h2 className="text-white text-left my-4 font-bold text-lg">Lance le guidage</h2>
                        <p className="text-white text-left">Liberty Rider et son app GPS spécial moto te guide sur le tracé. Tu peux aussi exporter en GPX pour les Tomtom Rider et Garmin Zumo.</p>
                    </div>
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