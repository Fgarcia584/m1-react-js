import AddRoadBook from "../../components/roadbook/addRoadBook"
import { useTitle } from "../../hooks/useTitle"


const AddRoadBookPage = () => {
    useTitle("Créer un itinéraire")

    return (
        <AddRoadBook/>
    )
}

export default AddRoadBookPage