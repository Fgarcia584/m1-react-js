import React, { useState, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router'
import { Map, Marker, NavigationControl, Source, Layer } from 'react-map-gl'
import maplibregl from 'maplibre-gl'
import "maplibre-gl/dist/maplibre-gl.css";
import polyline from "@mapbox/polyline";
import { directionsService } from '../../App'
import { useTitle } from '../../hooks/useTitle';
import { Link } from 'react-router-dom';

const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;


export const RoadBookDetailled = () => {

    const { state } = useLocation()
    useTitle(state.title)

    const mapTilerMapStyle = useMemo(() => {
        return `https://api.maptiler.com/maps/basic-v2/style.json?key=${MAPTILER_API_KEY}`;
    }, []);

    const [route, setRoute] = useState(null);

    const MAPS_DEFAULT_LOCATION = {
        latitude: state.steps[0].latitude,
        longitude: state.steps[0].longitude,
        zoom: 12,
    };


    const buildPolyline = () => {
        if (state.steps && state.steps.length > 1) {
            const origin = state.steps[0];
            const destination = state.steps[state.steps.length - 1];
            const waypoints = state.steps.slice(1, state.steps.length - 1).map((step) => {
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
    }


    useEffect(() => {
        buildPolyline();
    }, []);

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
                >
                    <NavigationControl />

                    {state.steps.length > 0 && state.steps.map((step, index) => {
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
            <div className="flex justify-center bg-base-100">
                <div className='w-[55%]'>
                    <div className="my-5">
                        <Link to={`/search/${state.country}`} className='text-sky-600 '> &lt; Toutes les balades moto {state.country}</Link>
                    </div>
                    <div className="my-5">
                        <h1 className='text-4xl font-extrabold my-5'>{state.title}</h1>
                        <div className="flex place-content-between">
                            <div className='flex items-center'>
                                <img className="w-8 rounded-full border-2 border-white" src={state.owner_photo_url} />
                                <div className="pl-3 text-xs font-semibold">{state.owner.split(' ')[0]}</div>
                            </div>
                            <div className='text-gray-400 text-xs'>Ajouté le {new Date(state.created_at.seconds * 1000).toLocaleDateString("fr")}</div>
                        </div>
                    </div>
                    <div className="my-5">
                        <div className='flex items-center place-content-between flex-wrap text-[15px]'>
                            <div className='my-2'>
                                <div className="mb-1">Distance</div>
                                <div className="text-xl font-semibold">{Math.round((state.distance / 1000))} Km</div>
                            </div>
                            <div className='border-l border-gray-300 w-[1px] self-stretch'></div>
                            <div className='my-2'>
                                <div className="mb-1">Durée</div>
                                <div className="text-xl font-semibold">{Math.floor(state.duration / 3600)}h{Math.round(state.duration % 60)}</div>
                            </div>
                            <div className='border-l border-gray-300 w-[1px] self-stretch'></div>
                            <div className='my-2'>
                                <div className="mb-1">Niveau</div>
                                <div className="text-xl font-semibold">{state.suggested_level}</div>
                            </div>
                            <div>
                                <div className="rating rating-sm text-gray-300 ">
                                    <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" checked readOnly/>
                                    <input type="radio" name="rating-6" className="mask mask-star-2 bg-orange-400" />
                                </div>
                                <span className='text-gray-300 mx-2'>•</span>
                                14 avis
                            </div>
                        </div>
                        <div className='py-4 my-3 border-y border-gray-300'>
                            <div className='flex place-content-between flex-wrap text-[13px]'>
                                <div className="btn btn-primary text-white font-semibold rounded-lg"> Lancer le guidage</div>
                            </div>
                        </div>
                        <div className='my-4 break-words'>
                            <div>
                                {state.descrpition}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-[38%] '></div>
            </div>

        </>
    )
}