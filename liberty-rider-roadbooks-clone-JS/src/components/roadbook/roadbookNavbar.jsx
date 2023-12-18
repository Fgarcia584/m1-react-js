import { Link } from "react-router-dom"


const RoadbooksNavbar = () => {

    return (
        <div className="navbar bg-base-100 px-4">
            <div className="flex-1">
                <input type="search" placeholder="On passe par où aujourd’hui ?" className="input input-bordered rounded-full w-[300px]" />
                <button className="btn btn-primary ml-6 rounded-full">Rechercher</button>
            </div>
            <div className="flex-none gap-2">
                <Link to={"/addRoute"} className="btn btn-primary rounded-full">Créer un itinéraire</Link>
            </div>
        </div>
    )
}

export default RoadbooksNavbar