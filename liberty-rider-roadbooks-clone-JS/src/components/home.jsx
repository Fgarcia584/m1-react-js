import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../firebase"
import { HomeCarousel } from "./home/homeCarousel"

export const Home = () => {

    const [roadbooks, setRoadbooks] = useState([]);

    const getRoadbooksFromFirestore = async () => {
        const collectionroadBooks = collection(db, 'roadbooks')
        const datas = await getDocs(collectionroadBooks)
        setRoadbooks(datas.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    }

    useEffect(() => {
        getRoadbooksFromFirestore()
    }, [])

    useEffect(() => {
    }, [roadbooks])

    return (
        <>
            <HomeCarousel city="Toulouse"/>
            <HomeCarousel city="Paris"/>
            <HomeCarousel city="Grenoble"/>
        </>
    )
}
