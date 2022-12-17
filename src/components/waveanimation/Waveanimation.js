import React from 'react'
import './waveanimation.css'

const Waveanimation = ({isPlaying}) => {
  let waveClass=isPlaying?'box active':"box"
  return (
    <div>
      <div className="wave-container">
      <div className={`${waveClass} box1`}></div>
      <div className={`${waveClass} box2`}></div>
      <div className={`${waveClass} box3`}></div>
      <div className={`${waveClass} box4`}></div>
      <div className={`${waveClass} box5`}></div>
      <div className={`${waveClass} box6`}></div>
      <div className={`${waveClass} box7`}></div>
      <div className={`${waveClass} box2`}></div>
      <div className={`${waveClass} box3`}></div>
      <div className={`${waveClass} box4`}></div>
      <div className={`${waveClass} box5`}></div>
      <div className={`${waveClass} box6`}></div>
      <div className={`${waveClass} box7`}></div>
      </div>
    </div>
  )
}

export default Waveanimation
