'use client'
import { ChangeEvent, useState } from 'react';
import confetti from 'canvas-confetti'
import type { Puzzle, CrosswordRow } from '../pages/astronomy';

interface CrosswordProps {
    puzzle: Puzzle
    /**
     * null represents loading
     */
    puzzleCompleted: boolean | null
    setPuzzleCompleted: (complete: boolean) => unknown
}

export const Crossword = ({ puzzle, puzzleCompleted, setPuzzleCompleted }: CrosswordProps) => {
    // VARIABLES
    const [userAnswers, setUserAnswers] = useState<CrosswordRow[]>(
        puzzle.crosswordRows.map(row => row.map(cell => (cell !== '' ? '' : null)))
    );
    const solutions: CrosswordRow[] = puzzle.crosswordRows.map(row => row.map(cell => (cell !== '' ? cell : null)));

    // FUNCTIONS
    const handleInputChange = (rowIndex: number, cellIndex: number, e: ChangeEvent<HTMLInputElement>) => {
        const updatedAnswers: CrosswordRow[] = [...userAnswers]
        updatedAnswers[rowIndex][cellIndex] = e.target.value.toUpperCase()

        setUserAnswers(updatedAnswers)
        if (JSON.stringify(updatedAnswers) === JSON.stringify(solutions)) {
            setPuzzleCompleted(true)
            confetti()
        }
    }

    return (
        <section className='max-w-[500px] m-auto w-full'>
            {puzzleCompleted === true ? (
                <div className='flex flex-col items-center p-8 gap-8 border border-info rounded-xl'>
                    <h3 className="font-semibold text-2xl text-success flex gap-2">
                        <span>Puzzle Complete</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill='currentColor'><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
                    </h3>
                    <a href="/" className='btn'>BACK TO HOME</a>
                </div>
            ) : (
                puzzleCompleted === false ? (
                    <div className="flex flex-col items-center gap-10">
                        <div>
                            {puzzle.crosswordRows.map((row, i) => (
                                <div key={i} className="flex">
                                    {row.map((cell, j) =>
                                        cell !== '' ? (
                                            <div className="relative" key={j}>
                                                <input
                                                    type="text"
                                                    className={`w-9 h-9 flex justify-center items-center border border-black text-center rounded-none ${userAnswers[i][j] === solutions[i][j] ? 'bg-success' : ""}`}
                                                    maxLength={1}
                                                    onChange={(e) => handleInputChange(i, j, e)}
                                                    value={(puzzleCompleted ? solutions[i][j] : userAnswers[i][j]) || ''}

                                                />
                                                {puzzle.wordStarts[i][j] ? (
                                                    <span className="absolute top-1 left-1 text-xs leading-none">{puzzle.wordStarts[i][j]}</span>
                                                ) : ""}
                                            </div>
                                        ) : (
                                            <div
                                                className="w-9 h-9 bg-black"
                                                key={j}>
                                            </div>
                                        )
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="grid gap-5">
                            <div>
                                <h2 className="font-bold">Across</h2>
                                {puzzle.clues.across.map((clue, i) => (
                                    <p key={i}>{clue}</p>
                                ))}
                            </div>
                            <div>
                                <h2 className="font-bold">Down</h2>
                                {puzzle.clues.down.map((clue, i) => (
                                    <p key={i}>{clue}</p>
                                ))}
                            </div>
                        </div>

                    </div>

                ) : (
                    <div className='text-center'>
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                    </div>
                )

            )}
        </section>
    )
}