'use client'
// TAG 4
import { useContext, useState, useEffect } from 'react';
import { ProgressDataContext } from '../context/ProgressDataContext';
import { Crossword } from '../components/Crossword';
import { HuntCompleteModal } from '../components/HuntCompleteModal';

export type Cell = string | null

export type CrosswordRow = Cell[]

/**
 * '' indicates that no word starts here
 */
export type WordStart = number | ''

export interface Puzzle {
    crosswordRows: CrosswordRow[];
    wordStarts: WordStart[][];
    clues: {
        across: string[];
        down: string[];
    }
}

export default function AstronomyPage() {
    const { progressData, setProgressData } = useContext(ProgressDataContext)
    const [puzzleCompleted, setPuzzleCompleted] = useState<boolean | null>(null)

    const puzzle: Puzzle = {
        crosswordRows: [
            ['', '', '', '', '', '', '', 'T', '', 'D'],
            ['', '', '', '', '', '', '', 'E', '', 'A'],
            ['', '', '', '', '', '', '', 'L', '', 'R'],
            ['N', 'A', 'K', 'E', 'D', 'E', 'Y', 'E', '', 'K'],
            ['', '', '', '', '', '', '', 'S', '', 'S'],
            ['', '', '', '', '', 'P', '', 'C', '', 'K'],
            ['', 'A', 'S', 'T', 'R', 'O', 'N', 'O', 'M', 'Y'],
            ['', '', '', '', '', 'L', '', 'P', '', ''],
            ['', '', '', '', '', 'L', '', 'E', '', ''],
            ['', '', '', '', '', 'U', '', '', '', ''],
            ['', '', '', '', '', 'T', '', '', '', ''],
            ['', '', '', '', '', 'I', '', '', '', ''],
            ['', '', '', '', '', 'O', '', '', '', ''],
            ['', '', '', '', '', 'N', '', '', '', '']
        ],
        wordStarts: [
            ['', '', '', '', '', '', '', 1, '', 2],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            [3, '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', 4, '', '', '', ''],
            ['', 5, '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', '', '', '']
        ],
        clues: {
            across: [
                "3. Used to view the night sky without equipment",
                "5. The study of celestial objects"
            ],
            down: [
                "1. Instrument used to view the night sky",
                "2. Capitol Reef is designated as an international ___ ___ park",
                "4. Light ___ is excessive brightness that obscures the night sky"
            ]
        }
    }

    // Sync progress data with the puzzleCompleted variable
    useEffect(() => {
        if (progressData) {
            setPuzzleCompleted(progressData.astronomy.completed)
        }
    }, [progressData])

    // If puzzleCompleted changes, update the progressData
    useEffect(() => {
        if (puzzleCompleted !== null) {
            setProgressData(prevState => ({
                ...prevState,
                astronomy: { ...prevState.astronomy, completed: puzzleCompleted }
            }))
        }
    }, [puzzleCompleted])

    // If all the tags are complete, show the Hunt Completed Modal
    useEffect(() => {
        if (puzzleCompleted) {
            if (progressData !== null) {
                if (Object.keys(progressData).every(tag => progressData[tag].completed === true)) {
                    (document.getElementById('completed_modal') as HTMLDialogElement).showModal()
                }
            }
        }
    }, [progressData])

    return (
        <main className="p-5 flex flex-col gap-5 max-w-[600px] m-auto">
            <h1 className='font-bold text-[35px]'>Astronomy</h1>

            <img src="src/assets/images/taskImages/SP_Astro_Dark_Sky.webp" alt="the milky way behind a mountain" className='rounded-3xl' />

            <h2 className='font-bold text-[30px]'>Dark Sky</h2>

            <p className='text-[15px]'>Our visitors are treated with wonderfully dark skies that can be enjoyed with the naked eye, and also with our telescopes, including a 12-inch Dobsonian. In 2015, Capitol Reef National Park was designated as an international dark sky park. It offers excellent night-sky viewing.</p>

            <img src="src/assets/images/taskImages/SP_Astro_Light_Pollution.webp" alt="the Capitol Reef Field Station under a dark sky" className='rounded-3xl' />

            <h2 className='font-bold text-[30px]'>Light Pollution</h2>

            <p className='text-[15px]'>At the field station, we strive to minimize light pollution. We have limited, low-wattage, downward-facing external lighting. All windows are equipped with blinds that are closed at night to reduce the amount of light that leaks from buildings into the environment. </p>

            <img src="src/assets/images/taskImages/SP_Astro_Night.webp" alt="the milky way as seen from Capitol Reef" className='rounded-3xl' />

            <h2 className='font-bold text-[30px]'>The Night Sky</h2>

            <p className='text-[15px]'>With much of its landscape above 7,000 feet, low smog and light pollution, wide open fields, and small towns separated by stretches of open highway, Capitol Reef National Park and the surrounding area offers one of the best places in the country to enjoy the night sky, learn and identify many of the constellations, and use binoculars and telescopes to study different types of astronomical objects.</p>

            <h3 className='font-bold text-[23px] text-center mt-6'>Complete the Crossword Puzzle</h3>

            <Crossword
                puzzle={puzzle}
                puzzleCompleted={puzzleCompleted}
                setPuzzleCompleted={setPuzzleCompleted}
            />

            <HuntCompleteModal />
        </main>
    )
}