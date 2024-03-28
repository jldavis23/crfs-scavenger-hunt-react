'use client'
// TAG 3
import { useContext, useState, useEffect } from 'react';
import { ProgressDataContext } from '../context/ProgressDataContext';
import { MatchingCards } from '../components/MatchingCards';
import { HuntCompleteModal } from '../components/HuntCompleteModal';
// IMAGES
import basaltBoulders from "../assets/images/cardGameImages/SP_Match_Basalt_Boulders.webp"
import henryMountains from "../assets/images/cardGameImages/SP_Match_Henry_Mount.webp"
import kayentaForm from "../assets/images/cardGameImages/SP_Match_Kayenta_Formation.webp"
import navajoSand from "../assets/images/cardGameImages/SP_Match_Navajo_Sand.webp"
import waterpocketFold from "../assets/images/cardGameImages/SP_Match_Waterpocket.webp"
import windgate from "../assets/images/cardGameImages/SP_Match_Windgate.webp"
import geoDesposition from "../assets/images/taskImages/SP_Geo_Desposition.webp"
import geoErosion from "../assets/images/taskImages/SP_Geo_Erosion.webp"
import geoUplift from "../assets/images/taskImages/SP_Geo_Uplift.webp"


export type Card = CardImage | CardText
export interface BaseCard {
    id: number
    isImage: boolean
    match: number
    isFlipped: boolean
    isMatched: boolean
}
export interface CardImage extends BaseCard {
    isImage: true
    imagePath: string
    alt: string
}
export interface CardText extends BaseCard {
    isImage: false
    text: string
}


export default function GeologyPage() {
    const { progressData, setProgressData } = useContext(ProgressDataContext)
    const [matchingCompleted, setMatchingCompleted] = useState<boolean | null>(null)

    const [cards, setCards] = useState<Card[]>([
        {
            id: 1,
            isImage: true,
            imagePath: basaltBoulders,
            alt: 'Basalt Boulders',
            match: 2,
            isFlipped: false,
            isMatched: false
        },
        {
            id: 2,
            isImage: false,
            text: 'Basalt Boulders',
            match: 1,
            isFlipped: false,
            isMatched: false
        },
        {
            id: 3,
            isImage: true,
            imagePath: henryMountains,
            alt: 'Henry Mountains',
            match: 4,
            isFlipped: false,
            isMatched: false
        },
        {
            id: 4,
            isImage: false,
            text: 'Henry Mountains',
            match: 3,
            isFlipped: false,
            isMatched: false
        },
        {
            id: 5,
            isImage: true,
            imagePath: kayentaForm,
            alt: 'Kayenta Formation',
            match: 6,
            isFlipped: false,
            isMatched: false
        },
        {
            id: 6,
            isImage: false,
            text: 'Kayenta Formation',
            match: 5,
            isFlipped: false,
            isMatched: false
        },
        {
            id: 7,
            isImage: true,
            imagePath: navajoSand,
            alt: 'Navajo Sandstone',
            match: 8,
            isFlipped: false,
            isMatched: false
        },
        {
            id: 8,
            isImage: false,
            text: 'Navajo Sandstone',
            match: 7,
            isFlipped: false,
            isMatched: false
        },
        {
            id: 9,
            isImage: true,
            imagePath: waterpocketFold,
            alt: 'Waterpocket Fold',
            match: 10,
            isFlipped: false,
            isMatched: false
        },
        {
            id: 10,
            isImage: false,
            text: 'Waterpocket Fold',
            match: 9,
            isFlipped: false,
            isMatched: false
        },
        {
            id: 11,
            isImage: true,
            imagePath: windgate,
            alt: 'Windgate',
            match: 12,
            isFlipped: false,
            isMatched: false
        },
        {
            id: 12,
            isImage: false,
            text: 'Windgate',
            match: 11,
            isFlipped: false,
            isMatched: false
        },
    ])

    // Update the matchingCompleted variable with the value of the corresponding tag in the localstorage
    useEffect(() => {
        if (progressData) {
            setMatchingCompleted(progressData.geology.completed)
        }
    }, [progressData])

    // Update the user's progress when matchingCompleted changes
    useEffect(() => {
        if (matchingCompleted !== null) {
            setProgressData(prevState => ({
                ...prevState,
                geology: { ...prevState.geology, completed: matchingCompleted }
            }))
        }
    }, [matchingCompleted])

    // If all the tags are complete, show the Hunt Completed Modal
    useEffect(() => {
        if (matchingCompleted) {
            if (progressData !== null) {
                if (Object.keys(progressData).every(tag => progressData[tag].completed === true)) {
                    (document.getElementById('completed_modal') as HTMLDialogElement).showModal()
                }
            }
        }
    }, [progressData])

    return (
        <main className="p-5 flex flex-col gap-5 max-w-[600px] m-auto">
            <h1 className='font-bold text-[35px]'>Geology</h1>

            <img src={geoDesposition} alt="rock formation at Captiol Reef with a wooden fence in front" className='rounded-3xl' />

            <h2 className='font-bold text-[30px]'>Deposition</h2>

            <p className='text-[15px]'>From the Field Station the visible layers are the red and tan Wingate cliffs, the Kayenta (where plants grow more easily), and the Navajo Sandstone (tan and white rounded slopes). Wingate Sandstone is cliff-forming and develops many vertical cracks in it. Above the Wingate (and therefore younger) is the Kayenta Formation. The youngest rock layer visible from Pleasant Creek is the Navajo Sandstone, the tan or white rounded domes above the Kayenta. The layers visible in Pleasant Creek are all Jurassic (200-145 MYA).</p>

            <img src={geoUplift} alt="the Waterpocket fold" className='rounded-3xl' />

            <h2 className='font-bold text-[30px]'>Uplift</h2>

            <p className='text-[15px]'>Most of the Colorado Plateau was uplifted uniformly, but in Capitol Reef, an ancient bedrock fault was reactivated and caused an uplift higher on the west side than the east. This nearly 100-mile long uplift is called the Waterpocket Fold, named by the Powell Expedition.</p>

            <p className='text-[15px]'>The name Waterpocket Fold comes from the many water pockets, depressions which often form in the sandstone layers, that fill with rainwater and snowmelt. For the early explorers, the waterpockets were essential to their travel, since they were in a land that was new to them. Fold refers to the eroded monocline, a fold or wrinkle in the earth's crust. The Waterpocket Fold is so large that it can be seen from the International Space Station!</p>

            <img src={geoErosion} alt="a gorge at Capitol Reef" className='rounded-3xl' />

            <h2 className='font-bold text-[30px]'>Erosion</h2>

            <p className='text-[15px]'>The rock layers of Capitol Reef were deposited hundreds of millions of years ago, yet geology is an ongoing process. Erosion is visible in every flash flood and rockfall.</p>

            <p className='text-[15px]'>You might have noticed the many black boulders scattered throughout Pleasant Creek, they are basalt and andesite boulders, volcanic or igneous rock. About 20 million years ago, lava came to the surface of the earth and filled in low-lying areas, which are now the high points of Boulder and Thousand Lake mountains.</p>

            <p className='text-[15px]'>Visible to the east of the field station, in the gap created by Pleasant Creek, sits another outcrop of igneous the rock, the Henry Mountains.</p>

            <h3 className='font-bold text-[23px] text-center mt-6'>Play the Matching Game</h3>

            <MatchingCards
                cards={cards}
                setCards={setCards}
                matchingCompleted={matchingCompleted}
                setMatchingCompleted={setMatchingCompleted}
            />

            <HuntCompleteModal />
        </main>
    )
}