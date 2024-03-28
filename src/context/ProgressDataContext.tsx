'use client'
import { createContext, useState, useEffect, Dispatch, SetStateAction } from "react"

export interface Tag {
    name: string
    completed: boolean
    description: string
    hint: string
    icon: string
}

export interface ProgressData {
    [key: string]: Tag
}

const initialProgressData: ProgressData = {
    sustainability: { 
        name: 'sustainability', 
        completed: false, 
        description: 'Location 1', 
        hint: 'Did you check the right side of the CRFS sign?', 
        icon: 'src/assets/images/icons/SP_sustainability_icon.svg' 
    },
    history: { 
        name:'history', 
        completed: false, 
        description: 'Location 2', 
        hint: 'Did you check the right side of the CRFS sign?', 
        icon: 'src/assets/images/icons/SP_history_icon.svg'
    },
    geology: { 
        name: 'geology', 
        completed: false, 
        description: 'Location 3', 
        hint: 'Did you check the right side of the CRFS sign?', 
        icon: 'src/assets/images/icons/SP_geology_icon.svg' 
    },
    astronomy: { 
        name: 'astronomy', 
        completed: false, 
        description: 'Location 4', 
        hint: 'Did you check the right side of the CRFS sign?', 
        icon: 'src/assets/images/icons/SP_astronomy_icon.svg' 
    }
}

export const ProgressDataContext = createContext<{
    progressData: ProgressData | null,
    setProgressData: Dispatch<SetStateAction<ProgressData>>
}>({
    progressData: {} as ProgressData,
    setProgressData: {} as Dispatch<SetStateAction<ProgressData>>
})

export const ProgressDataProvider = ({ children }) => {
    const [progressData, setProgressData] = useState<ProgressData | null>(null)

    useEffect(() => {
        const data: string | null = localStorage.getItem('progressData')
        if (data === null) {
            //if the localstorage item progressData does not exist, add it
            localStorage.setItem('progressData', JSON.stringify(initialProgressData))
            setProgressData(initialProgressData)
        } else {
            //if the localstorage item progressData does exist, set the state variable to that value
            setProgressData(JSON.parse(data))
        }
    }, [])

    useEffect(() => {
        // when the state variable changes, this useEffect hook is fired. Keeps the localstorage in sync with progressData state variable
        if (progressData !== null) {
          localStorage.setItem('progressData', JSON.stringify(progressData))
        }
    }, [progressData])

    return (
        <ProgressDataContext.Provider value={{progressData, setProgressData}}>
            {children}
        </ProgressDataContext.Provider>
    )
}