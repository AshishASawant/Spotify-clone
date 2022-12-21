import React, { useState, useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import apiClient from "../spotify";
import musicContext from "./musicContext";

const Musicstate = (props) => {
  const [playList, setPlayList] = useState([]);
  const [loading, setLoading] = useState(false)
  const navigate=useNavigate()
  const [lib, setLib] = useState({});
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [audio] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const { duration } = audio;
  const [trackProgress, setTrackProgress] = useState(0);
  const [categories, setcategories] = useState([]);
  const [genre, setGenre] = useState([])

  useEffect(() => {
    if (tracks.length === 0) {
    }
    audio.src = tracks[0]?.track?.preview_url ;
    setCurrentTrack(tracks[0]?.track);
    setCurrentIndex(0);
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tracks]);

  // this useeffect changes the audio state when the currentindex changes
  useEffect(() => {
    audio.src = tracks[currentIndex]?.track.preview_url;
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  //this useeffect play/pauses the music
  useEffect(() => {
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  useEffect(() => {
    apiClient.get(`browse/categories`).then(({ data }) => {
      setcategories(data.categories.items);
      setLib(data.categories.items[0].id);
      apiClient.get(`browse/categories/${data.categories.items[0].id}/playlists`).then(({ data }) => {
        navigate('/player',{state:{'id':data.playlists.items[0].id}})
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  setInterval(() => {
    setTrackProgress(audio.currentTime);
  }, 1000);

  const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

  audio.addEventListener("ended", () => {
    if(tracks.length===1){
      setIsPlaying(false)
    }
    handleNext();
  });

  const handleNext = () => {
    if (currentIndex < tracks.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsPlaying(true);
      setTrackProgress(0);
    } else {
      setCurrentIndex(0);
    }
  };
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(tracks.length - 1);
    }
  };

  return (
    <musicContext.Provider
      value={{
        playList,
        setPlayList,
        tracks,
        setTracks,
        currentTrack,
        setCurrentTrack,
        currentIndex,
        setCurrentIndex,
        audio,
        isPlaying,
        setIsPlaying,
        handleNext,
        handlePrev,
        setTrackProgress,
        trackProgress,
        currentPercentage,
        lib,
        setLib,
        categories,
        setcategories,
        loading,setLoading,genre
      }}
    >
      {props.children}
    </musicContext.Provider>
  );
};

export default Musicstate;
