import React from "react"
import { Fragment } from "react"
import { useTitle } from "../hooks/useTitle"
import { Home } from "../components/home"

export const Homepage = () => {
    useTitle("Balades moto : trouver, lancer ou créer le meilleur road book")


    return (
        <Fragment>
            <Home />
        </Fragment>
    )
}
