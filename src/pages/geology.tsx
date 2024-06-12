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

            <p className='text-[15px]'>Rock layers reveal ancient environments, with characteristics like texture and color indicating past conditions when the layers formed. When studying geology and looking at rock layers, the oldest rocks are at the bottom, and the youngest rocks are at the top. Many layers of rock are visible from the Field Station, but the most prevalent are (from oldest to youngest) the Moenkopi Formation, the Chinle Formation, the red and tan Wingate sandstone, the Kayenta Formation (where plants grow more easily), and the Navajo Sandstone (white rounded domes).</p>

            <img src={geoUplift} alt="the Waterpocket fold" className='rounded-3xl' />

            <h2 className='font-bold text-[30px]'>Uplift</h2>

            <p className='text-[15px]'>Most of the Colorado Plateau was uplifted uniformly, but in Capitol Reef, an ancient bedrock fault was reactivated which caused an uplift higher on the west side than the east. This nearly 100-mile-long uplift is called the Waterpocket Fold, named by the Powell Expedition.</p>

            <p className='text-[15px]'>The name Waterpocket Fold comes from the many water pockets, depressions which often form in the sandstone layers, that fill with rainwater and snowmelt. For the early explorers, the waterpockets were essential to their travel, since they were in a land that was new to them. Fold refers to the eroded monocline, a fold or wrinkle in the earth's crust. The Waterpocket Fold is so large that it can be seen from the International Space Station!</p>

            <img src={geoErosion} alt="a gorge at Capitol Reef" className='rounded-3xl' />

            <h2 className='font-bold text-[30px]'>Erosion</h2>

            <p className='text-[15px]'>The Waterpocket Fold eroded primarily 20-15 million years ago, mainly by water rather than wind, which is a more potent erosional force. Human activities like open pit mining can also contribute to erosion. Despite rock layers in Capitol Reef forming millions of years ago, ongoing erosion is evident through events like flash floods and rockfalls.</p>

            <p className='text-[15px]'>You might have noticed the many black boulders scattered throughout Pleasant Creek, mostly made of basalt, which is a type of volcanic or igneous rock. They formed about 20 million years ago when lava filled low spots, creating the high points of Boulder and Thousand Lake mountains. These mountains, capped with tough volcanic rock, survived while other areas eroded away. In the last 200,000 to 100,000 years, massive landslides carried the boulders into Capitol Reef, where erosion and waterways like Pleasant Creek shaped them into mesas and terraces.</p>

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