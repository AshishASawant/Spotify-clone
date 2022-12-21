import React, { useContext } from 'react'
import './categorie.css'
import { useNavigate } from 'react-router-dom'
import musicContext from '../../state/musicContext'
import Displaycard from '../../components/displaycard/Displaycard'
import Loading from '../../components/loading/Loading'

const Categorie = () => {
  const context=useContext(musicContext)
  const {setLib,categories,loading}=context 
  
  const navigate=useNavigate()
  const newCategorie=(id)=>{
    setLib(id)
  navigate('/trending')
}
    


  return (
    <div className='mainscreen'>
      {loading?<Loading/>:
      <div className="playlist-container">
        {categories?.map((item)=>{
        return(<Displaycard key={item.id} id={item.id} title={item.name} img={item?.icons[0]?.url } subtitle={item.tracks?.total} click={()=>newCategorie(item.id)} / >) 
        })}
      </div>}
    </div>
  )
}

export default Categorie
