import React from 'react'
import './control.css'
import { FaPause } from "react-icons/fa";
import { IoPlaySkipBack, IoPlaySkipForward, IoPlay } from "react-icons/io5";

const Controls = (  {isPlaying,
  setIsPlaying,
  handleNext,
  handlePrev}) => {
  return (
    <div className='control-container'>
      <IoPlaySkipBack size={50} className='pointer' onClick={handlePrev}/>
      <div className=''>

      {isPlaying?<FaPause size={50} className='pointer play-pause play-pause-btn.active' onClick={()=>setIsPlaying(!isPlaying)}/>:<IoPlay size={50} className='pointer play-pause' onClick={()=>setIsPlaying(!isPlaying)}/>}
      </div>
      <IoPlaySkipForward size={50} className='pointer' onClick={handleNext}/>
    </div>
  )
}

export default Controls
