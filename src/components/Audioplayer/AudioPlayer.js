import React, {  useContext } from "react";
import "./audioplayer.css";
import Progresscircle from "../progresscircle/Progresscircle";
import Controls from "../controls/Controls";
import Waveanimation from "../waveanimation/Waveanimation";
import musicContext from "../../state/musicContext";

const AudioPlayer = (props) => {

  const context=useContext(musicContext)
  const{isPlaying,setIsPlaying,currentPercentage,trackProgress,handleNext,handlePrev}=context
  // const {duration}=audio
  // const [trackProgress, setTrackProgress] = useState(0);


  // useEffect(() => {
  //   // audio.pause()
  //   audio.src=tracks[0]?.track.preview_url
  //   setIsPlaying(true)
  //   audio.play()
  //  }, [tracks])
  
  
  // // this useeffect changes the audio state when the currentindex changes
  // useEffect(() => {
  //   audio.src=(tracks[currentIndex]?.track.preview_url)
  //   if(isPlaying){
  //     audio.play()
  //   }
  //   else{
  //     audio.pause()
  //   }
  // }, [currentIndex])  

  // //this useeffect play/pauses the music
  // useEffect(() => {
  //  if(isPlaying){
  //   audio.play()
  //  }
  //  else{
  //   audio.pause()
  //  }
  //  console.log(isPlaying)
  // }, [isPlaying])

 
  // setInterval(() => {
  //   setTrackProgress(audio.currentTime)
  // }, 1000);
  

  // const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;
  // audio.addEventListener('ended',()=>{
  //     handleNext()
  // })

  // const handleNext=()=>{
  //   if(currentIndex<tracks.length-1){
  //       setCurrentIndex(currentIndex+1)
  //       setIsPlaying(true)
  //     setTrackProgress(0)
  //   }
  //   else{
  //     setCurrentIndex(0)
 
  //   }
  // }
  // const handlePrev=()=>{
  //   if(currentIndex>0){
  //     setCurrentIndex(currentIndex-1)
  //   }
  //   else{
  //     console.log(tracks.length-1)
  //     setCurrentIndex(tracks.length-1)
  //   }
  // }
  

  const addZero = (n) => {
    return n > 9 ? "" + n : "0" + n;
  };



  const artist = [];
  props.currentTrack?.album?.artists?.forEach((item) => {
    artist.push(item.name);
  });
  return (
    <div className="audio-player-container">
      <div className="audio-player-left">
      <Progresscircle
          percentage={ currentPercentage }
          isPlaying={isPlaying}
          image={props.currentTrack?.album?.images[0]?.url}
          size={300}
          color="#C96850"
        />
      </div>
      <div className="audio-player-right">
        <p className="audio-title">{props.currentTrack?.album?.name}</p>
        <p className="audio-subtitle">{artist.join(" | ")}</p>
        <div className="audio-duration">
          <p className="audio-progress">0:{addZero(Math.round(trackProgress))}</p>
          <Waveanimation isPlaying={isPlaying} />
          <p className="audio-end">00:30</p>
        </div>
        <Controls
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      </div>
    </div>
 
  );
};

export default AudioPlayer;
