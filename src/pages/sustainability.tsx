'use client'
// TAG 1
import { useContext, useState, useEffect } from 'react'
import { ProgressDataContext } from '../context/ProgressDataContext'
import { Quiz } from '../components/Quiz'
import { HuntCompleteModal } from '../components/HuntCompleteModal'
// IMAGES
import enviroBattery from "../assets/images/taskImages/SP_Enviro_Battery.webp"
import enviroHeatCool from "../assets/images/taskImages/SP_Enviro_HeatingCooling.webp"
import enviroWaterTank from "../assets/images/taskImages/SP_Enviro_WaterTank.webp"

export interface Choice {
    label: string
    isCorrect: boolean
}

export interface QuizQuestion {
    question: string,
    choices: Choice[]
}

export default function SustainabilityPage() {
    const { progressData, setProgressData } = useContext(ProgressDataContext)
    const [quizCompleted, setQuizCompleted] = useState<boolean | null>(null)
    const [quiz, setQuiz] = useState<QuizQuestion[]>([
        {
            question: 'What type of power do the solar panels produce?',
            choices: [
                { label: 'DC', isCorrect: true },
                { label: 'AC', isCorrect: false },
                { label: 'Nuclear', isCorrect: false },
                { label: 'Reactive power', isCorrect: false }
            ]
        },
        {
            question: 'Which direction do the trombe walls face?',
            choices: [
                { label: 'South', isCorrect: true },
                { label: 'North', isCorrect: false },
                { label: 'East', isCorrect: false },
                { label: 'West', isCorrect: false }
            ]
        },
        {
            question: 'On average, how much rain does Capitol Reef get each year?',
            choices: [
                { label: '7 inches', isCorrect: true },
                { label: '8 inches', isCorrect: false },
                { label: '4 inches', isCorrect: false },
            ]
        }
    ])

    // Set quizCompleted to the current value of tag1.completed
    useEffect(() => {
        if (progressData) {
            setQuizCompleted(progressData.sustainability.completed)
        }
    }, [progressData])

    // When quizCompleted changes to true, set progress data tag 2 to true
    useEffect(() => {
        if (quizCompleted !== null) {
            setProgressData(prevState => ({
                ...prevState,
                sustainability: { ...prevState.sustainability, completed: quizCompleted }
            }))
        }
    }, [quizCompleted])

    // If all the tags are complete, show the Hunt Completed Modal
    useEffect(() => {
        if (quizCompleted) {
            if (progressData !== null) {
                if (Object.keys(progressData).every(tag => progressData[tag].completed === true)) {
                    (document.getElementById('completed_modal') as HTMLDialogElement).showModal()
                }
            }
        }
    }, [progressData])

    return (
        <main className="p-5 flex flex-col gap-5 max-w-[600px] m-auto">
            <h1 className='font-bold text-[35px]'>Sustainability</h1>

            <img src={enviroBattery} alt="battery packs at the Capitol Reef Field Station" className='rounded-3xl' />

            <h2 className='font-bold text-[30px]'>Electricity</h2>

            <p className='text-[15px]'>The field station produces its own electricity through 72 200-watt solar panels. The panels produce DC power which is then stored in a bank of lithium ferrous phosphate batteries (see image above) and is converted to AC power to use on demand.</p>

            <img src={enviroHeatCool} alt="Trombe walls" className='rounded-3xl' />

            <h2 className='font-bold text-[30px]'>Heating & Cooling</h2>

            <p className='text-[15px]'>Trombe walls (see image above) capture and release energy depending on the season. These walls face south, are painted black, and must be covered with a pane of glass. This creates air pockets between the wall and glass which is heated by the sun in the winter and reduces heat in the summer.</p>

            <img src={enviroWaterTank} alt="Water tank" className='rounded-3xl' />

            <h2 className='font-bold text-[30px]'>Water</h2>

            <p className='text-[15px]'>The Field Station gets its water from a well near Pleasant Creek using solar power to transport it uphill to the water treatment facility. From there it is filtered and treated for visitors use. As Capitol Reef National Park receives an average of 7 inches of precipitation each year, it is vital to be mindful of water use.</p>

            <h3 className='font-bold text-[23px] text-center mt-6'>Test Your Knowledge</h3>

            <Quiz
                quiz={quiz}
                setQuiz={setQuiz}
                quizCompleted={quizCompleted}
                setQuizCompleted={setQuizCompleted}
            />

            <HuntCompleteModal />
        </main>
    )
}