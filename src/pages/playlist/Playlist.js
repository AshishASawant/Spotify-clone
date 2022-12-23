import React, { useContext, useEffect, useState } from 'react'
import apiClient from '../../spotify'
import './playlist.css'
import {  useNavigate } from 'react-router-dom'
import musicContext from '../../state/musicContext'
import Displaycard from '../../components/displaycard/Displaycard'
import Loading from '../../components/loading/Loading'


const Playlist = () => {
  const context=useContext(musicContext)
  const {lib}=context 
  const [loading, setLoading] = useState(false)
  const navigate= useNavigate()
const [tplayList, setTplayList] = useState([])

  useEffect(() => {
    setLoading(true)
    apiClient
    .get(`browse/categories/${lib}/playlists`)
    .then(({ data }) =>{
     setTplayList(data.playlists.items)
     setLoading(false)
    }).catch((err)=>{
      if(err.response.status){
        alert('Your Access token has expired. Please signout and login again')
      }
      setLoading(false)
     })
    }, [lib])
  
   
    
    const getPlaylist=(id)=>{
      navigate('/player',{state:{id}})
    }
  

  return (
    <div className='mainscreen'>
      {loading?<Loading/>:
      <div className="playlist-container">
        {tplayList?.map((item)=>{
         return (<Displaycard key={item.id} id={item.id} img={item?.images[0]?.url} title={item.name} subtitle={item.tracks?.total} click={()=>getPlaylist(item.id)} / >)
        })}
      </div>}
    </div>
  )
}

export default Playlist;
