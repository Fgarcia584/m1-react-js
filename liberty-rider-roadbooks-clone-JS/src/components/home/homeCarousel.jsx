import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, limit } from "firebase/firestore"
import { db } from "../../../firebase"
import { RoadbookCard } from '../roadbook/roadbookCard';


export const HomeCarousel = ({ city }) => {

    const [roadbooks, setRoadbooks] = useState([]);

    const getRoadbooksFromFirestore = async () => {
        const collectionroadBooks = collection(db, 'roadbooks')
        const q = query(collectionroadBooks, where("country", "==", city), limit(4))
        const datas = await getDocs(q)
        setRoadbooks(datas.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    }

    useEffect(() => {
        getRoadbooksFromFirestore()
    }, [])

    useEffect(() => {
        console.log(roadbooks)
    }, [roadbooks])

    return (
        <div className="max-w-[1290px] mx-auto">
            <div className="flex flex-row justify-between p-4 items-center">
                <div className="text-[35px] font-extrabold">Balades moto { city }</div>
                <div>Toutes les balades moto { city }</div>
            </div>
            <div className="flex flex-row justify-between p-4 items-center overflow-x-auto">
                {roadbooks.length > 0 && roadbooks.map(roadbook => {
                    return (
                        <RoadbookCard roadbook={roadbook} tmp_url={"https://loremflickr.com/g/320/240/motorbike?random=" + Math.random(1000)} />
                    )
                })}
            </div>
        </div >
    )
};