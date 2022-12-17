import React, { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import './player.css'
import apiClient from "../../spotify";
import Albumimage from "../../components/albumImage/Albumimage";
import AudioPlayer from "../../components/Audioplayer/AudioPlayer"
import musicContext from "../../state/musicContext";
import Widget from "../../components/widget.js/Widget";

const Player = () => {
  const context = useContext(musicContext);
  const {tracks, setTracks,currentTrack, setCurrentTrack,currentIndex, setCurrentIndex,isPlaying,setIsPlaying,audio}=context
  const location = useLocation();
  const artist=[]
  useEffect(() => {
    apiClient
      .get(`playlists/${location.state?.id}/tracks`)
      .then(({ data }) =>{
       setTracks(data.items)
      setCurrentTrack(data.items[0].track)
      setCurrentIndex(0)
  });
  }, [location.state]);

  useEffect(() => {
   setCurrentTrack(tracks[currentIndex]?.track)
  }, [currentIndex]);

  currentTrack?.album?.artists?.forEach(item=>{
    artist.push(item.name)
  })


  const handleOnChange=(index)=>{
    setCurrentTrack(tracks[index].track)
    setCurrentIndex(index)
  }

  return <div className="mainscreen">
    <div className="player-container">
    <div className="left-container">
    <AudioPlayer
          currentTrack={currentTrack}
          tracks={tracks}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          currentPercentage={'74'}
        />
    <Widget artistId={currentTrack?.album?.artists[0]?.id}/>
    </div>
    <div className="right-container">
      <div className="album-card">
        <Albumimage url={currentTrack?.album?.images[0]?.url}/>
      <div className="album-info">
        <p className="album-title">{currentTrack?.album?.name} </p>
        <p className="album-subtitle">BY :- {artist?.join(", ")}</p>
        <p className="album-release">Released on {currentTrack?.album?.release_date}</p>
      </div>
      </div>
      <div className="queue-container">
        <p className="queue-text">Up Next</p>
        <div className="queue-items">
          {tracks.map((item,i)=>{
            return <div className="queue-dt" key={i} onClick={()=>handleOnChange(i)}>
            <p className="queue-song">{item.track.album.name}</p>
            <p className="queue-time">0.30</p>
            </div>
          })}
    
        </div>
      </div>
    </div>
    </div>
  </div>;
};

export default Player;
