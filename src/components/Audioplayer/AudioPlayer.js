import React, {  useContext } from "react";
import "./audioplayer.css";
import Progresscircle from "../progresscircle/Progresscircle";
import Controls from "../controls/Controls";
import Waveanimation from "../waveanimation/Waveanimation";
import musicContext from "../../state/musicContext";

const AudioPlayer = (props) => {
  
  const context=useContext(musicContext)
  const{isPlaying,setIsPlaying,currentPercentage,trackProgress,handleNext,handlePrev}=context
  

  const addZero = (n) => {
    return n > 9 ? "" + n : "0" + n;
  };



  const artist = [];
  // console.log(props.currentTrack)
  if(props.currentTrack?.album){props.currentTrack?.album?.artists?.forEach((item) => {
    artist.push(item.name);
  })}else{props.currentTrack?.artists?.forEach((item) => {
    artist.push(item.name);
  })}
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
        <p className="audio-title">{props.currentTrack?.name}</p>
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
