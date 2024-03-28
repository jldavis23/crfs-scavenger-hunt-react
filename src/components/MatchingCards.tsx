'use client'
import { useState, useEffect } from 'react';
import styles from './MatchingCards.module.css';
import confetti from 'canvas-confetti'
import type { Card } from '../pages/geology';

interface MatchingCards {
    cards: Card[]
    setCards: (complete: Card[]) => unknown
    matchingCompleted: boolean | null
    setMatchingCompleted: (complete: (boolean | null)) => unknown
}

export const MatchingCards = ({ cards, setCards, matchingCompleted, setMatchingCompleted }: MatchingCards) => {
    const [selectedCards, setSelectedCards] = useState<Card[]>([])

    // Shuffle the cards array on first render
    useEffect(() => {
        const arr: Card[] = [...cards]

        let currIndex: number = arr.length
        let randomIndex: number

        while (currIndex > 0) {
            randomIndex = Math.floor(Math.random() * currIndex)
            currIndex--

            [arr[currIndex], arr[randomIndex]] = [arr[randomIndex], arr[currIndex]]
        }

        setCards(arr)
    }, [])

    // Run this every time the cards array is updated
    useEffect(() => {
        // Set the selectedCards array to the cards that are currently flipped but not yet matched
        setSelectedCards(cards.filter((card: Card ) => card.isFlipped && !card.isMatched))

        // Check if every card has been matched
        if (cards.every((card: Card) => card.isMatched)) {
            setMatchingCompleted(true)
            confetti()
        }
    }, [cards])

    // Run this code every time the selectedCards array is updated
    useEffect(() => {
        if (selectedCards.length > 1) {
            if (selectedCards[0].match === selectedCards[1].id) {
                setTimeout(() => {
                    const updatedCards: Card[] = cards.map(card => (card.id === selectedCards[0].id || card.id === selectedCards[1].id) ? { ...card, isMatched: true } : card)

                    setCards(updatedCards)
                }, 1000)

            } else {
                setTimeout(() => {
                    const updatedCards: Card[] = cards.map(card => (card.isFlipped && !card.isMatched) ? { ...card, isFlipped: false } : card)
                    setCards(updatedCards)
                }, 1000)

            }
        }
    }, [selectedCards])

    const handleCardFlip = (card: Card) => {
        if (!card.isMatched) {
            if (card.isFlipped) {
                const updatedCards: Card[] = cards.map((c: Card) => c.id === card.id ? { ...c, isFlipped: !c.isFlipped } : c)
                setCards(updatedCards)
            } else {
                if (selectedCards.length < 2) {
                    const updatedCards: Card[] = cards.map((c: Card) => c.id === card.id ? { ...c, isFlipped: !c.isFlipped } : c)
                    setCards(updatedCards)
                }
            }
        }
    }

    return (
        <section className='border border-info rounded-xl p-2 max-w-[500px] m-auto w-full'>
            {matchingCompleted === true ? (
                <div className='flex flex-col items-center p-8 gap-8'>
                    <h3 className="font-semibold text-2xl text-success flex gap-2">
                        <span>Game Complete</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill='currentColor'><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436 2.843 2.817z"/></svg>
                    </h3>
                    <a href="/" className='btn'>BACK TO HOME</a>
                </div>
            ) : (
                matchingCompleted === false ? (
                    <div className='flex flex-wrap justify-center gap-3'>
                        {cards.map(card => (
                            <div key={card.id} className={`${styles.scene}`}>
                                <div className={`${styles.card} ${card.isFlipped ? styles.flipped : ''} ${card.isMatched ? styles.matched : ''}`} onClick={() => handleCardFlip(card)}>
                                    <div className={`${styles.cardFace} ${styles.front}`}></div>

                                    <div className={`${styles.cardFace} ${styles.back}`}>
                                        {card.isImage ? <img src={card.imagePath} alt={card.alt} className='rounded-lg' /> : <p className='h-full p-1 text-center flex justify-center items-center'>{card.text}</p>}
                                    </div>
                                </div>
                            </div>
                        ))}
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