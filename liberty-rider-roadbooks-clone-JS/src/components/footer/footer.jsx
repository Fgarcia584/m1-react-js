import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {


    const experts = ["Dafy", "Le guide Road Trips à moto", "High Side", "Roadtrip Magazine", "P&V", "Vivium"]
    const places = ["France", "Auvergne-Rhône-Alpes", "Occitanie", "Grenoble", "Provence-Alpes-Côte d'Azur", "Nouvelle-Aquitaine", "Grand Est", "Bourgogne-Franche-Comté", "Montpellier", "Paris"]
    const places_2 = ["Hauts-de-France", "Toulouse", "Belgique", "Île-de-France", "Normandie", "Pays de la Loire", "Bretagne", "Nantes", "Wallonie", "Reims"]

    return (
        <div className=" bg-stone-900">
            <div className="flex mx-auto py-8 max-w-[1440px]">
                <div className="flex w-3/4 justify-evenly p-7">
                    <div className="text-white max-w-1/3 ">
                        <h3 className="text-lg font-bold mb-4">Les balades par expert</h3>

                        {experts.map((expert, index) => {
                            return (
                                <Link to={`/search/${expert}`} key={index} className=" block mb-5 text-sm text-stone-200">Balades de {expert}</Link>
                            )
                        }
                        )}
                    </div>
                    <div className="text-white max-w-1/3 ">
                        <h3 className="text-lg font-bold mb-4">Les balades par lieu</h3>

                        {places.map((place, index) => {
                            return (place !== "" &&
                                <Link to={`/search/${place}`} key={index} className=" block mb-5 text-sm text-stone-200">Balades moto {place}</Link>
                            )
                        }
                        )}

                    </div>
                    <div className="text-white max-w-1/3 ">
                        <div className="text-lg font-bold mb-4"> &nbsp; </div>
                        {places_2.map((place, index) => {
                            return (place !== "" &&
                                <Link to={`/search/${place}`} key={index} className=" block mb-5 text-sm text-stone-200">Balades moto {place}</Link>
                            )
                        }
                        )}

                    </div>
                </div>
                <div className="w-1/4 p-7">
                    <div className='flex flex-col text-lg font-semibold'>
                        <div className="font-normal text-stone-200 inline-block min-w-12 leading-[48px]">Aide</div>
                        <div className="font-normal text-stone-200 inline-block min-w-12 leading-[48px]">Contact</div>
                        <div className="font-normal text-stone-200 inline-block min-w-12 leading-[48px]">Blog</div>
                        <div className="font-normal text-stone-200 inline-block min-w-12 leading-[48px]">CGU</div>
                        <div className="font-normal text-stone-200 inline-block min-w-12 leading-[48px]">Mentions légales</div>
                        <div className="font-normal text-stone-200 inline-block min-w-12 leading-[48px]">Confidentialité</div>
                        <div className="font-normal text-stone-200 inline-block min-w-12 leading-[48px]">Presse</div>
                        <div className="font-normal text-stone-200 inline-block min-w-12 leading-[48px]">Jobs</div>
                    </div>
                    <div className='w-[59px] flex justify-between mt-[70px]'>
                        &nbsp;
                    </div>
                    <div className='w-full text-xs font-normal text-white leading-tight mt-16'> Liberty Rider Clone• Elective React • 2023-2024 </div>
                </div>
            </div>
        </div>
    )
}

export default Footer