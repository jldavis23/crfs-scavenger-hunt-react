'use client'
import { useState, useEffect } from 'react'
import styles from './Quiz.module.css'
import confetti from 'canvas-confetti'
import type { QuizQuestion, Choice } from '../pages/history'

interface QuizProps {
    quiz: QuizQuestion[]
    setQuiz: (complete: QuizQuestion[]) => unknown
    quizCompleted: boolean | null
    setQuizCompleted: (complete: boolean | null) => unknown
}

export const Quiz = ({ quiz, setQuiz, quizCompleted, setQuizCompleted }: QuizProps) => {
    // VARIABLES
    const [userAnswers, setUserAnswers] = useState<{[key: number]: Choice | null}>({})
    const [showResults, setShowResults] = useState<boolean>(false)
    const [userScore, setUserScore] = useState<number>(0)

    // Shuffles the question choices for each question
    useEffect(() => {
        const arr: QuizQuestion[] = [...quiz]

        arr.forEach((question: QuizQuestion) => {
            let currIndex: number = question.choices.length
            let randomIndex: number

            while (currIndex > 0) {
                randomIndex = Math.floor(Math.random() * currIndex)
                currIndex--

                [question.choices[currIndex], question.choices[randomIndex]] = [question.choices[randomIndex], question.choices[currIndex]]
            }
        })

        setQuiz(arr)
    }, [])


    useEffect(() => {
        quiz.forEach((question, i) => {
            setUserAnswers(prevAnswers => ({
                ...prevAnswers,
                [i]: null
            }))
        })
    }, [])


    // FUNCTIONS

    // sets the user answers variable when a quiz choice is selected
    const handleInputChange = (qIndex: number, selectedChoice: Choice) => {
        setUserAnswers(prevAnswers => ({
            ...prevAnswers,
            [qIndex]: selectedChoice
        }))
    }

    // Handles when the quiz is submitted/restarted
    const submitOrTryAgain = (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (showResults) {
            setShowResults(false)
        } else {
            setShowResults(true)
            if (Object.values(userAnswers).every(answer => answer?.isCorrect)) {
                // if every answer is correct, set the user's score and mark the quiz as complete. Confetti!
                setUserScore(quiz.length)
                setQuizCompleted(true)
                confetti()
            } else {
                // Calculate the user's score
                let score: number = 0
                for (const qNum in userAnswers) {
                    if (Object.hasOwnProperty.call(userAnswers, qNum) && userAnswers[qNum]?.isCorrect) {
                        score++;
                    }
                }                
                setUserScore(score)
            }
        }
    }

    // Scrolls to specific parts of the page when the submit quiz/try again button is clicked
    const scrollTo = () => {
        // if all the questions have been answered...
        if (Object.keys(userAnswers).every((answer) => userAnswers[answer] !== null)) {
            if (showResults) {
                // if the results are showing (the button says 'try again') scroll to top of quiz when clicked
                const quizSection: HTMLElement | null = document.getElementById('quiz');

                setTimeout(() => {
                    if (quizSection !== null) {
                        quizSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 10)
            } else {
                // if the results are not showing (the button says 'submit quiz') scroll to the bottom of the page to results when clicked
                setTimeout(() => {
                    window.scrollTo({
                        top: document.documentElement.scrollHeight,
                        behavior: 'smooth',
                    })
                }, 10)
            }
        } else {
            alert('Please answer all questions before submitting.');
        }
    }

    return (
        <section className='max-w-[500px] w-full m-auto'>
            {quizCompleted === true ? (
                <div className='flex flex-col items-center p-8 gap-8 border border-info rounded-xl'>
                    <h3 className="font-semibold text-2xl text-success flex gap-2">
                        <span>Quiz Complete</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill='currentColor'><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
                    </h3>
                    <a href="/" className='btn'>BACK TO HOME</a>
                </div>
            ) : (
                quizCompleted === false ? (
                    <form id='quiz' onSubmit={submitOrTryAgain}>
                        {quiz.map((question, i) => (
                            <div key={i} className="p-5">
                                <p className="text-center text-xl font-medium mb-3">{i + 1}. {question.question}</p>

                                <div className="flex flex-col gap-3">
                                    {question.choices.map((choice, j) => (
                                        <input
                                            type="radio"
                                            name={`question${i + 1}`}
                                            aria-label={choice.label}
                                            key={j}
                                            className={`btn btn-outline border-secondary rounded-full font-normal ${showResults ? ( // if showResults is true, and the choice matches the user selected choice, apply the style of correct or incorrect based on choice.isCorrect
                                                userAnswers[i]?.label === choice.label ? (
                                                    choice.isCorrect ? (
                                                        styles.choiceCorrect
                                                    ) : (
                                                        styles.choiceIncorrect
                                                    )
                                                ) : ''
                                            ) : styles.quizChoice
                                                }`}
                                            disabled={showResults || quizCompleted}
                                            onChange={() => handleInputChange(i, choice)}
                                            required
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}

                        {showResults ? (
                            <div className='my-4'>
                                <p className='text-center'>Score: {userScore}/{quiz.length}</p>
                                <p className='text-center'>Required: {quiz.length}/{quiz.length}</p>
                                <p className='text-center text-secondary text-lg mt-5'>{quizCompleted ? 'You finished the quiz!' : 'Please try the quiz again'}</p>
                            </div>
                        ) : ''}

                        {quizCompleted ? '' : <button type='submit' className="btn btn-secondary rounded-full w-full mt-2" onClick={scrollTo}>{showResults ? 'RETRY QUIZ' : 'SUBMIT'}</button>}
                    </form>

                ) : (
                    <div className='text-center'>
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                    </div>
                )
            )}
        </section>
    )
}