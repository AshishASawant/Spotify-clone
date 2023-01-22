import React, { useContext, useEffect, useState } from "react";
import "./bottomController.css";
import musicContext from "../../state/musicContext";
import { FaPause } from "react-icons/fa";
import {
  IoPlaySkipBack,
  IoPlaySkipForward,
  IoPlay,
  IoRepeatOutline,
} from "react-icons/io5";
import { RxShuffle } from "react-icons/rx";
const Bottomcontroller = () => {

    
    const [details, setDetails] = useState({title:"",subtitle:"",imgUrl:""})
    
  const context = useContext(musicContext);
  const {
    isPlaying,
    setIsPlaying,
    handleNext,
    handlePrev,
    audio,
    repeat,
    shuffle,
    currentIndex,
    tracks,
    trackProgress,
    setShuffle,
    setRepeat,
  } = context;
  
  useEffect(() => {
   setDetails({title:tracks[currentIndex]?.track?.name,subtitle:tracks[currentIndex]?.track?.artists[0]?.name,imgUrl:tracks[currentIndex]?.track?.album?.images[0].url})
  }, [currentIndex])
  
  const addZero = (n) => {
    return n > 9 ? "" + n : "0" + n;
  };

  const changeCtime = () => {
    audio.currentTime = document.getElementsByName("seekbar")[0].value;
  };

  return (
    <div className="bottom-controller">
      <div className="disc-container">
        <div className={!isPlaying?"disc":"disc animate"}>
          <img src={details.imgUrl} alt="artist" />
        </div>
        <div className="disc-info">
          <p className="disc-title">{details.title}</p>
          <p className="disc-subtitle">{details.subtitle}</p>
        </div>
      </div>
      <div className="all-container">
        <div className="seek-container">
          <p className="music-duration">
            00:{addZero(Math.round(trackProgress))}
          </p>
          <input
            type="range"
            name="seekbar"
            max={30}
            value={Math.round(trackProgress)}
            className="seek-bar"
            onChange={changeCtime}
          />
          <p className="music-duration">00:30</p>
        </div>
        <div className="bcontroll-container">
          <RxShuffle size={31}  className={shuffle?"high-light res-btn  pointer shuffle-special shuffle-repeat":"res-btn nres-btn pointer shuffle-special shuffle-repeat"}  onClick={()=>{setShuffle(!shuffle)
            setRepeat(false)}} />
          <IoPlaySkipBack size={30} className="res-btn  pointer" onClick={handlePrev} />
          <div className="">
            {isPlaying ? (
              <FaPause
                size={10}
                className="res-btn nres-btn pointer .play-pause-btn.active play-pause bplay-pause new-pbtn"
                onClick={() => setIsPlaying(!isPlaying)}
              />
            ) : (
              <IoPlay
                size={10}
                className="res-btn nres-btn pointer play-pause bplay-pause new-pbtn"
                onClick={() => setIsPlaying(!isPlaying)}
              />
            )}
          </div>
          <IoPlaySkipForward
            size={30}
            className="res-btn  pointer"
            onClick={handleNext}
          />
          <IoRepeatOutline size={30} className={repeat?"high-light res-btn  pointer shuffle-repeat":"res-btn  pointer shuffle-repeat"} onClick={()=>{setRepeat(!repeat)
          setShuffle(false)}} />
        </div>
      </div>
      <div className="volume-container"></div>
    </div>
  );
};

export default Bottomcontroller;
