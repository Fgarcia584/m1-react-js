import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar";
import React from "react";


export const NavbarLayout = () => {
    
    return (
        <>
            <Navbar />
            <Outlet />
        </>
        
    );
};
