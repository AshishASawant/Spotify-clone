import React from 'react'
import './displaycard.css'
import {BsFillPlayCircleFill} from 'react-icons/bs'


const Displaycard = ({title,subtitle,img,click}) => {
  // console.log(title,subtitle,img,click)
  return (
      
        <div className="playlist-card" >
          {<img src={img } alt="Artist" className='playlist-img' />}
          <p className='playlist-title'>{title}</p>
          <p className='playlist-subtitle'>{subtitle}</p>
          <div className="play-logo">
          <BsFillPlayCircleFill size={50} style={{color:'green',cursor:'pointer'}} onClick={click}/>
          </div>
         </div>
   
  )
}

export default Displaycard
