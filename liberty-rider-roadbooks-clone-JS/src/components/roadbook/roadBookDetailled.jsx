import React from 'react'
import { useParams, useLocation } from 'react-router'
import { Map, Marker, NavigationControl, Source, Layer } from 'react-map-gl'

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;

export const RoadBookDetailled = () => {

    const { state } = useLocation()

    const mapTilerMapStyle = useMemo(() => {
        return `https://api.maptiler.com/maps/basic-v2/style.json?key=${MAPTILER_API_KEY}`;
    }, []);

    const [location, setLocation] = useState(null);
    const [route, setRoute] = useState(null);

    const MAPS_DEFAULT_LOCATION = {
        latitude: state.roadbookSteps[0].latitude,
        longitude: state.roadbookSteps[0].longitude,
        zoom: 12,
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
                }
            });
        }

    }, [roadbookSteps]);



    console.log(state)
    return (
        <>
            <div className="w-full h-[400px]">
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
        </>
    )
}