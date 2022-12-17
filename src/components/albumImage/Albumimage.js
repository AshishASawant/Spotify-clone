import React from 'react'
import './albumimage.css'

const Albumimage = ({url}) => {
  return (
    <div className='album-image'>
      <img src={url} alt="Album image" />
      <div className="glass-morphism">
      <img src={url} alt="Album image" />
      </div>
    </div>
  )
}

export default Albumimage
