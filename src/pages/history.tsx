'use client'
// TAG 2
import { useContext, useState, useEffect } from 'react'
import { ProgressDataContext } from '../context/ProgressDataContext'
import { Quiz } from '../components/Quiz'
import { HuntCompleteModal } from '../components/HuntCompleteModal'
// IMAGES
import histExpedition from "../assets/images/taskImages/SP_History_Expedition.webp"
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
            question: 'What year was the expedition that came near Capitol Reef?',
            choices: [
                { label: '1776', isCorrect: true },
                { label: '1780', isCorrect: false },
                { label: '1783', isCorrect: false },
                { label: '1775', isCorrect: false }
            ]
        },
        {
            question: 'What did the orchards consist of?',
            choices: [
                { label: 'apples, peaches, pears, and plums', isCorrect: true },
                { label: 'cherries, mangoes, and apricots', isCorrect: false },
                { label: 'carrots, potatoes, and lettuce', isCorrect: false }
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

            <img src={histExpedition} alt="painting of the Dominguez Escalante Expedition" className='rounded-3xl' />

            <h2 className='font-bold text-[30px]'>Dominguez Escalante Expedition</h2>

            <p className='text-[15px]'>Their 1776 expedition came close to the area known today as Capitol Reef. Throughout their journey they wrote detailed journals on the difficult terrain, scarcity of resources, and interactions with the Ute tribes.</p>

            <img src={histOrchards} alt="an orchard of trees with pink blossoms" className='rounded-3xl' />

            <h2 className='font-bold text-[30px]'>Orchards</h2>

            <p className='text-[15px]'>Nels Johnson and Ephraim Hanks moved into Capitol Reef and claimed the land. In 1880 Johnson planted the first orchards of apples, peaches, pear, plums, walnut, and almond trees.</p>

            <img src={histSchool} alt="the Fruita School house" className='rounded-3xl' />

            <h2 className='font-bold text-[30px]'>Fruita School House</h2>

            <p className='text-[15px]'>Behumim donated land for the Schoolhouse that was completed in 1896. HIs daughter, 12 at the time, was the school's first teacher. The school remained open until 1941 but still stands at Capitol Reef.</p>

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