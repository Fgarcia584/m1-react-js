import React, { Fragment } from 'react';
import { useTitle } from '../../hooks/useTitle';
import { RoadbookSearchList } from '../../components/roadbook/roadbookSearchList';

export const RoadbookSearchListPage = () => {
    useTitle("Balades moto : trouver, lancer ou créer le meilleur road book")

    return (
        <Fragment>
            <RoadbookSearchList />
        </Fragment>
    )
}