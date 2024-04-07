'use client'
import { createContext, useState, useEffect, Dispatch, SetStateAction } from "react"
import sustainIcon from "../assets/images/icons/SP_sustainability_icon.svg"
import historyIcon from "../assets/images/icons/SP_history_icon.svg"
import geologyIcon from "../assets/images/icons/SP_geology_icon.svg"
import astronomyIcon from "../assets/images/icons/SP_astronomy_icon.svg"

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
        description: 'Tag 1', 
        hint: 'Did you check below the solar panels?', 
        icon: sustainIcon
    },
    history: { 
        name:'history', 
        completed: false, 
        description: 'Tag 2', 
        hint: 'Did you look by the books?', 
        icon: historyIcon
    },
    geology: { 
        name: 'geology', 
        completed: false, 
        description: 'Tag 3', 
        hint: 'Did you take a picture of the landscape?', 
        icon: geologyIcon
    },
    astronomy: { 
        name: 'astronomy', 
        completed: false, 
        description: 'Tag 4', 
        hint: 'Did the check the classroom?', 
        icon: astronomyIcon
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