import React,{useState,useEffect} from 'react'
import apiClient from '../spotify'
import musicContext from './musicContext'


const Musicstate = (props) => {
    const [playList, setPlayList] = useState([])
    const [tracks, setTracks] = useState([]);
    const [currentTrack, setCurrentTrack] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [audio]=useState(new Audio())
    const [isPlaying, setIsPlaying] = useState(false);
    const {duration}=audio
    const [trackProgress, setTrackProgress] = useState(0);
  

    useEffect(() => {
      audio.src=tracks[0]?.track.preview_url
      if(isPlaying){
        audio.play()
       }
       else{
        audio.pause()
       }
       console.log('track')
     }, [tracks])
    
    
    // this useeffect changes the audio state when the currentindex changes
    useEffect(() => {
      audio.src=(tracks[currentIndex]?.track.preview_url)
      if(isPlaying){
        audio.play()
      }
      else{
        audio.pause()
      }
      console.log('current',isPlaying)
    }, [currentIndex])  
  
    //this useeffect play/pauses the music
    useEffect(() => {
     if(isPlaying){
      audio.play()
     }
     else{
      audio.pause()
     }
     console.log(isPlaying)
    }, [isPlaying])
    
   useEffect(() => {
      console.log('useefect')
   }, [])
   
    
   
    setInterval(() => {
      setTrackProgress(audio.currentTime)
    }, 1000);
    
    const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

    audio.addEventListener('ended',()=>{
        handleNext()
    })
  
    const handleNext=()=>{
      if(currentIndex<tracks.length-1){
          setCurrentIndex(currentIndex+1)
          setIsPlaying(true)
        setTrackProgress(0)
      }
      else{
        setCurrentIndex(0)
      }
    }
    const handlePrev=()=>{
      if(currentIndex>0){
        setCurrentIndex(currentIndex-1)
      }
      else{
        console.log(tracks.length-1)
        setCurrentIndex(tracks.length-1)
      }
    }
    
  
  
  return (
    <musicContext.Provider   value={{playList,setPlayList,tracks, setTracks,currentTrack, setCurrentTrack,currentIndex, setCurrentIndex,audio,isPlaying,setIsPlaying,handleNext,handlePrev,setTrackProgress,trackProgress,currentPercentage}}>
        {props.children}
    </musicContext.Provider>
  )
}

export default Musicstate