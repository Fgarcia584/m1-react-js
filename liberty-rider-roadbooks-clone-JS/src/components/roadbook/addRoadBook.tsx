import { MapContainer, TileLayer, } from "react-leaflet"
import "leaflet/dist/leaflet.css";


const AddRoadBook = () => {

    return (
        <div className="flex h-[calc(100%-68px)]">
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
            <div className="h-full w-full">
                <MapContainer className="h-[calc(100vh-68px)] w-full" center={[46.5314714,2.6059299]} zoom={6} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            </div>
        </div>
    )
}

export default AddRoadBook