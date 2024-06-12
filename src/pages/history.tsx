'use client'
// TAG 2
import { useContext, useState, useEffect } from 'react'
import { ProgressDataContext } from '../context/ProgressDataContext'
import { Quiz } from '../components/Quiz'
import { HuntCompleteModal } from '../components/HuntCompleteModal'
// IMAGES
import histExpedition from "../assets/images/taskImages/SP_History_Expedition.jpg"
import histOrchards from "../assets/images/taskImages/SP_History_Orchards.webp"
import histSchool from "../assets/images/taskImages/SP_History_School.webp"

export interface Choice {
    label: string
    isCorrect: boolean
}

export interface QuizQuestion {
    question: string,
    choices: Choice[]
}

export default function HistoryPage() {
    const { progressData, setProgressData } = useContext(ProgressDataContext)
    const [quizCompleted, setQuizCompleted] = useState<boolean | null>(null)
    const [quiz, setQuiz] = useState<QuizQuestion[]>([
        {
            question: 'Who named the Waterpocket Fold?',
            choices: [
                { label: 'Almon H. Thompson', isCorrect: true },
                { label: 'Elijah Behumim', isCorrect: false },
                { label: 'J.A. Call', isCorrect: false },
                { label: 'John Wesley Powell', isCorrect: false }
            ]
        },
        {
            question: 'How many acres of orchard had Nels Johnson planted by the turn of the century?',
            choices: [
                { label: '11', isCorrect: true },
                { label: '9', isCorrect: false },
                { label: '30', isCorrect: false }
            ]
        },
        {
            question: 'How old was the first teacher of the Fruita school house?',
            choices: [
                { label: '12', isCorrect: true },
                { label: '22', isCorrect: false },
                { label: '15', isCorrect: false },
                { label: '17', isCorrect: false }
            ]
        }
    ])

    // Set quizCompleted to the current value of tag2.completed
    useEffect(() => {
        if (progressData) {
            setQuizCompleted(progressData.history.completed)
        }
    }, [progressData])

    // When quizCompleted changes to true, set progress data tag 2 to true
    useEffect(() => {
        if (quizCompleted !== null) {
            setProgressData(prevState => ({
                ...prevState,
                history: { ...prevState.history, completed: quizCompleted }
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
            <h1 className='font-bold text-[35px]'>History</h1>

            <img src={histExpedition} alt="Almon H. Thompson on a horse" className='rounded-3xl' />

            <h2 className='font-bold text-[30px]'>John Wesley Powell Expeditions</h2>

            <p className='text-[15px]'>In 1871, J.A. Call and Wal. Bateman became the earliest known Euro-Americans to traverse Capitol Reef, leaving their names and the date etched in Capitol Gorge. A year later, Almon H. Thompson led a geographical expedition for John Wesley Powell, exploring the region more extensively. They descended from Boulder Mountain, encountering rugged terrain. Thompson named the large geologic monocline the “Waterpocket Fold” due to its many waterpockets.</p>

            <img src={histOrchards} alt="an orchard of trees with pink blossoms" className='rounded-3xl' />

            <h2 className='font-bold text-[30px]'>Orchards</h2>

            <p className='text-[15px]'>Capitol Reef is famous for its historic orchards. Nels Johnson, the first landholder of record in Fruita, had planted 11 acres of orchard by the turn of the century. Fruita was perfect for these orchards because of its long growing season, lower elevation, and easy access to water from the Fremont River. Today, the orchards are managed by the National Park Service and visitors to Capitol Reef can pick their own fruit when it's in season.</p>

            <img src={histSchool} alt="the Fruita School house" className='rounded-3xl' />

            <h2 className='font-bold text-[30px]'>Fruita School House</h2>

            <p className='text-[15px]'>Elijah Behumim donated land for the Fruita schoolhouse, which was completed in 1896. His 12-year-old daughter, Nettie, became its first teacher. The school remained open until 1941, and the building still stands at Capitol Reef.</p>

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