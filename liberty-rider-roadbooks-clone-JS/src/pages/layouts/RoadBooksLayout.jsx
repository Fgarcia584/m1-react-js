import { Outlet } from "react-router-dom"
import RoadbooksNavbar from "../../components/roadbook/roadbookNavbar"
import Footer from "../../components/footer/footer"

const RoadbooksLayout = () => {

        return (
            <>
                <RoadbooksNavbar/>
                <Outlet/>
                <Footer/>
            </>
        );
}

export default RoadbooksLayout;