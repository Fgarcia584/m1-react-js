import React from 'react';
import { Link } from 'react-router-dom';

export const RoadbookCard = ({ roadbook, tmp_url }) => {
    return (
        <div className="card w-[294px] bg-base-100 shadow-md my-3">
            <Link to={`/roadbooks/${roadbook.id}`} state={roadbook}>
                <div className="card-body m-3 p-2">
                    <div className="flex items-center">
                        <img className="w-6 rounded-full" src={roadbook.owner_photo_url} />
                        <div className="pl-3 text-xs font-semibold">{roadbook.owner.split(' ')[0]}</div>
                    </div>
                    <h3 className="card-title text-[15px]">{roadbook.title}</h3>
                    <div className="rating rating-xs">
                        <input type="radio" name="rating-4" className="mask mask-star-2 bg-yellow-500" />
                        <input type="radio" name="rating-4" className="mask mask-star-2 bg-yellow-500" checked readOnly/>
                        <input type="radio" name="rating-4" className="mask mask-star-2 bg-yellow-500" />
                        <input type="radio" name="rating-4" className="mask mask-star-2 bg-yellow-500" />
                        <input type="radio" name="rating-4" className="mask mask-star-2 bg-yellow-500" />
                    </div>
                    <div className="card bg-base-100 border border-gray-300 rounded-lg">
                        <figure><img src={tmp_url} alt="map thumbmail" /></figure>
                        <div className="flex place-content-around my-2">
                            <div>
                                <div className="text-gray-400 text-xs">Distance</div>
                                <div className="text-sm font-semibold"> {Math.round((roadbook.distance / 1000))} Km</div>
                            </div>
                            <div>
                                <div className="text-gray-400 text-xs">Durée</div>
                                <div className="text-sm font-semibold"> {Math.floor(roadbook.duration / 3600)}h{Math.round(roadbook.duration % 60)}</div>
                            </div>
                            <div>
                                <div className="text-gray-400 text-xs">Niveau</div>
                                <div className="text-sm font-semibold"> {roadbook.suggested_level}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
};