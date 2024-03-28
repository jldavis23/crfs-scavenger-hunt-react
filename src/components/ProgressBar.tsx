'use client'
import { useContext, useRef, useEffect } from 'react'
import { ProgressDataContext } from '../context/ProgressDataContext'
import gsap from "gsap";
import { useNavigate } from 'react-router-dom';

export const ProgressBar = () => {
  // VARIABLES
  const { progressData } = useContext(ProgressDataContext)
  const completedTags: string[] = (progressData !== null ? Object.keys(progressData).filter(tag => progressData[tag].completed) : [])
  const percentComplete: number = (progressData !== null ? ((completedTags.length / Object.keys(progressData).length) * 100) : 0)
  const bar = useRef<HTMLDivElement>(null) 

  const navigate = useNavigate()

  //HOOKS
  useEffect(() => {
    const progressBar: HTMLDivElement | null = bar.current
    if (progressBar !== null) progressBar.style.width = '0%'

    gsap.to(progressBar, {
      width: `${percentComplete}%`,
      duration: 0.3
    });
  }, [percentComplete])


  return (
    <section className='bg-white shadow w-full fixed top-0 min-h-[86px] z-50'>
      <div className="flex gap-3 p-4 max-w-[600px] m-auto">
        <div className='flex gap-2'>
          <a href="/" className='btn btn-circle'><img src="src/assets/images/icons/SP_Home_Icon.svg" alt="Home"/></a>
        </div>
        <div className='w-full'>

          <div className="relative w-full h-7 border border-black rounded-full overflow-hidden">
            <div
              ref={bar}
              className="absolute top-0 left-0 h-full bg-info" // Can use the class transition-all to replace the gsap animation if wanted
              style={{ width: `${percentComplete}%` }}
            ></div>
          </div>

          <div className='flex justify-end mt-2 items-center'>
            <p className="mr-2 text-[15px]"><span className="font-bold">{completedTags.length}</span> out of <span className="font-bold">{progressData !== null ? Object.keys(progressData).length : 0}</span> complete</p>

            <a onClick={()=> 
              navigate("/instructions")
            }>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#808080" viewBox="0 0 256 256"><path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path></svg>
            </a>
            
          </div>
          
        </div>
      </div>
    </section>
  )
}