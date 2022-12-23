import React, { useContext, useEffect,useState } from 'react'
import apiClient from '../../spotify'
import './library.css'
import {  useNavigate } from 'react-router-dom'
import musicContext from '../../state/musicContext'
import Displaycard from '../../components/displaycard/Displaycard'
import Loading from '../../components/loading/Loading'


const Library = () => {
  const context = useContext(musicContext)
  const {playList,setPlayList}=context
  const [loading, setLoading] = useState(false)
  const navigate= useNavigate()
  useEffect(() => {
    setLoading(true)
   apiClient.get('me/playlists').then(({data})=>{
    setPlayList(data.items)
    setLoading(false)
   }).catch((err)=>{
    if(err.response.status===401){
      alert('Your Access token has expired. Please signout and login again')
    }
    setLoading(false)
   })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const openPlaylist=(id)=>{
    console.log(id)
    navigate('/player',{state:{id}})
  }
  
  return (
    <div className='mainscreen'>
      {loading?<Loading/>:
      <div className="playlist-container">
        {playList.map((item)=>{
         return (<Displaycard key={item.id} id={item.id} img={item?.images[0]?.url} title={item.name} subtitle={item.tracks?.total} click={()=>openPlaylist(item.id)} / >)
         
        })}
      </div>}
    </div>
  )
}

export default Library
