import React, { useContext, useEffect } from 'react'
import apiClient from '../../spotify'
import './library.css'
import {BsFillPlayCircleFill} from 'react-icons/bs'
import {  useNavigate } from 'react-router-dom'
import musicContext from '../../state/musicContext'


const Library = () => {
  const context = useContext(musicContext)
  const {playList,setPlayList}=context
  const navigate= useNavigate()
  useEffect(() => {
   apiClient.get('me/playlists').then(({data})=>{
    setPlayList(data.items)
   })
  }, [])

  const openPlaylist=(id)=>{
    console.log(id)
    navigate('/player',{state:{id}})
  }
  
  return (
    <div className='mainscreen'>
      <div className="playlist-container">
        {playList.map((item)=>{
         return (<div className="playlist-card" key={item.id} >
          <img src={item.images[0]?.url } alt="Artist" className='playlist-img' />
          <p className='playlist-title'>{item.name}</p>
          <p className='playlist-subtitle'>{item.tracks.total}</p>
          <div className="play-logo">
          <BsFillPlayCircleFill size={50} style={{color:'green',cursor:'pointer'}} onClick={()=>{openPlaylist(item.id)}}/>
          </div>
         </div>
        )
        })}
      </div>
    </div>
  )
}

export default Library
