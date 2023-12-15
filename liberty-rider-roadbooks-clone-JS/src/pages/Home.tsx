import React from "react"
import { Fragment } from "react"
import { useTitle } from "../hooks/useTitle"

const Home = () => {
    useTitle("Balades moto : trouver, lancer ou créer le meilleur road book")
    return (
        <Fragment>
            <h1 className="h-screen">Bienvenue sur mon site</h1>
        </Fragment>
    )
}

export default Home