export const RoadbookCard = ({ roadbook, tmp_url }) => {
    console.log(roadbook)
    return (
        <div className="card w-[294px] bg-base-100 shadow-xl">
            <div className="card-body m-3 p-2">
                <div className="flex items-center">
                    <img className="w-6 rounded-full" src={roadbook.owner_photo_url} />
                    <div className="pl-3 text-xs font-semibold">{roadbook.owner.split(' ')[0]}</div>
                </div>
                <h3 className="card-title text-[15px]">{roadbook.title}</h3>
                <div className="rating rating-xs">
                    <input type="radio" name="rating-4" className="mask mask-star-2 bg-yellow-500" />
                    <input type="radio" name="rating-4" className="mask mask-star-2 bg-yellow-500" checked />
                    <input type="radio" name="rating-4" className="mask mask-star-2 bg-yellow-500" />
                    <input type="radio" name="rating-4" className="mask mask-star-2 bg-yellow-500" />
                    <input type="radio" name="rating-4" className="mask mask-star-2 bg-yellow-500" />
                </div>
                <div className="card bg-base-100 shadow-xl">
                    <figure><img src={tmp_url} alt="map thumbmail" /></figure>
                    <div className="flex place-content-around">
                        <div>
                            <div className="text-gray-400 text-xs">Distance</div>
                            <div className="text-sm"> {Math.round((roadbook.distance / 1000))} Km</div>
                        </div>
                        <div>
                            <div className="text-gray-400 text-xs">Durée</div>
                            <div className="text-sm"> {Math.floor(roadbook.duration / 3600)}h{Math.round(roadbook.duration % 60)}</div>
                        </div>
                        <div>
                            <div className="text-gray-400 text-xs">Niveau</div>
                            <div className="text-sm"> {roadbook.suggested_level}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};