'use client'
import { useState, useContext, useEffect } from "react"
import { ProgressDataContext } from "./context/ProgressDataContext"

export default function Home() {
  const {progressData} = useContext(ProgressDataContext)
  const [completedTags, setCompletedTags] = useState<string[] | null>(null)
  const [uncompletedTags, setUncompletedTags] = useState<string[] | null>(null)

  useEffect(() => {
    if (progressData) {
      setCompletedTags(Object.keys(progressData).filter(tag => progressData[tag].completed))
      setUncompletedTags(Object.keys(progressData).filter(tag => !progressData[tag].completed))
    }
  }, [progressData])


  return (
    <main className="p-5 max-w-[600px] m-auto">

      {/* UNCOMPLETED TAGS */}
      <h2 className="text-[35px] font-bold">To Find</h2>

      <div className="mt-3 flex flex-col gap-4">
        {uncompletedTags ? (
          uncompletedTags.length > 0 ? (
            uncompletedTags.map((tag, i) => (
              <div key={i} className="collapse bg-accent rounded-lg font-medium">
                <input type="checkbox" />
                <div className="collapse-title flex items-center gap-3 pe-4 justify-between"> 
                  <div className="flex items-center gap-3">
                    <img className="w-12" src={progressData !== null ? progressData[tag].icon : ''} alt={`${progressData !== null ?progressData.name : ''} icon`} />
                    <p className="text-[15px]">{progressData !== null ? progressData[tag].description : ''}</p>
                  </div>
                  
                  <button className="btn btn-secondary rounded-full">HINT</button>
                </div>
                <div className="collapse-content">
                  <p className="font-bold mt-4 text-[#4b4f39]">{progressData !== null ? progressData[tag].hint : ''}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-neutral text-center p-3 rounded-lg font-medium">
              <p className="font-bold mb-2">You have found all the tags and completed the scavenger hunt!</p>
              <a href="/huntcompleted" className="link">See certificate →</a>
            </div>
          )
        ) : (
          <div className='text-center'>
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        )}


      </div>

      {/* COMPLETED TAGS */}
      <h2 className="text-[35px] font-bold my-5">Completed</h2>

      <div className="mt-3 flex flex-col gap-4">
        {completedTags ? (
          completedTags.length > 0 ? (
            completedTags.map((tag, i) => (
              <div key={i} className="flex items-center justify-between gap-3 bg-[#7d8376] p-3 rounded-lg font-medium">
                <div className="flex items-center gap-3">
                  <img className="w-12" src={progressData !== null ? progressData[tag].icon : ''} alt={`${progressData !== null ? progressData.name : ''} icon`} />
                  <p className="text-[15px]" >{progressData !== null ? progressData[tag].description : ''}</p>
                </div>
                
                <a href={`/${progressData !== null ? progressData[tag].name : ''}`} className="btn btn-ghost text-primary-content">VIEW</a>
              </div>
            ))
          ) : (
            <div className="bg-neutral text-center p-4 rounded-lg font-medium">
              <p className="font-bold mb-2">0 Completed</p>
              <p>Search the field station for the white tags to get started</p>
            </div>
          )
        ) : (
          <div className='text-center'>
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        )}

      </div>
    </main>
  )
} 