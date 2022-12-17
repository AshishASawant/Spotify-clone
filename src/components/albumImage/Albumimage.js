import React from 'react'
import './albumimage.css'

const Albumimage = ({url}) => {
  return (
    <div className='album-image'>
      <img src={url} alt="Album " />
      <div className="glass-morphism">
      <img src={url} alt="Album " />
      </div>
    </div>
  )
}

export default Albumimage
