import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar";


export const NavbarLayout = () => {
    
    return (
        <>
            <Navbar />
            <Outlet />
        </>
        
    );
};
