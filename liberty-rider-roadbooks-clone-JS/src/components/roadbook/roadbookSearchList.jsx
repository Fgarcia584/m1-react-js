import { or } from "firebase/firestore";
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../../firebase"
import { RoadbookCard } from "./roadbookCard";

export const RoadbookSearchList = () => {

    const { destination } = useParams()

    const [roadbooks, setRoadbooks] = useState([]);

    const getRoadbooksFromFirestore = async () => {
        const collectionroadBooks = collection(db, 'roadbooks')
        const q = query(collectionroadBooks,
            or(where("country", "==", destination),
                where("city", "==", destination),
                where("region", "==", destination),
                where("state", "==", destination)))
        const datas = await getDocs(q)
        setRoadbooks(datas.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    }

    useEffect(() => {
        getRoadbooksFromFirestore()
    }, [destination])

    useEffect(() => {
    }, [roadbooks])

    return (
        <div className=" max-w-[1290px] mx-auto flex flex-row flex-wrap justify-between p-4 items-center overflow-x-auto">
            {roadbooks.length > 0 && roadbooks.map(roadbook => {
                return (
                    <RoadbookCard roadbook={roadbook} tmp_url={"https://loremflickr.com/g/320/240/motorbike?random=" + Math.random(1000)} />
                )
            })}
        </div>
    )
}
