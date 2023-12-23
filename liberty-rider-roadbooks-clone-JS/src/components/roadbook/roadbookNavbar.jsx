import { Link } from "react-router-dom"
import { useState } from "react"


const RoadbooksNavbar = () => {

    const [destination, setDestination] = useState("");

    const onDestinationValueChange = (event) => {
        setDestination(event.target.value);
    }

    return (
        <div className="navbar bg-base-100 px-4">
            <div className="flex-1">
                <input type="search" value={destination} onChange={onDestinationValueChange} placeholder="On passe par où aujourd’hui ?" className="input input-bordered rounded-full w-[300px]" />
                <Link to={`/search/${destination}`} className="btn btn-primary ml-6 rounded-full text-white">Rechercher</Link>
            </div>
            <div className="flex-none gap-2">
                <Link to={"/addRoute"} className="btn btn-primary rounded-full text-white">Créer un itinéraire</Link>
            </div>
        </div>
    )
}

export default RoadbooksNavbar