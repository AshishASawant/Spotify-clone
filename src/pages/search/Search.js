import React, { useContext, useState } from "react";
import "./search.css";
import { useNavigate } from "react-router-dom";
import musicContext from "../../state/musicContext";
import numberToWords from "number-to-words"
import Displaycard from "../../components/displaycard/Displaycard";
import apiClient from "../../spotify";
import Bottomcontroller from "../../components/bottomcontroller/Bottomcontroller";

const Search = () => {
   

  const context = useContext(musicContext);
  const { setTracks } = context;
  const [artist, setArtist] = useState([]);
  const [sSong, setSSong] = useState([]);
  const getSearch = (e) => {
    apiClient
      .get("/search?q=" + e.target.value + "&type=track,artist")
      .then(({ data }) => {
        setArtist(data.artists.items.slice(0, 4));
        setSSong(data.tracks.items.slice(0, 4));
      }).catch((err)=>{
        if(err.response.status===401){
          alert('Your Auth Token has expired. Please Login Again')
          localStorage.removeItem('token')
          window.location.reload()
        }
      })
  };

  const navigate = useNavigate();




  return (
    <div className="mainscreen">
      < div className="search-container">
        <input
          type="text"
          className="input-field"
          title="search"
          onChange={getSearch}
          placeholder='Search'
          autoFocus
        />
        <div className="search-res-container">
          <div className="change-flow">
          {sSong.length>0 && <p className="info-text">Songs</p>}
          <div className="res-container">
          {sSong?.map((item) => {
            return (
              <Displaycard
              key={item.id}
              id={item.id}
              title={item.name}
              img={item?.album.images[0]?.url}
              subtitle={"Artist: "+item.artists[0]?.name}
              click={() =>{ setTracks([{track:item}]) 
              navigate('/player')}}
              />
              );
            })}
            </div>
            </div>
            <div className="change-flow">
            {artist.length>0 && <p className="info-text">Artists</p>}
        <div className="res-container">
          {artist?.map((item) => {
            return (
              <Displaycard
              key={item.id}
                id={item.id}
                title={item.name}
                img={item?.images[0]?.url}
                subtitle={"Followers: "+numberToWords.toWordsOrdinal(item.followers?.total).split(",")[0]+" +"}
                click={() => {
                  let newArr=[]
                  apiClient.get(`artists/${item.id}/top-tracks?market=ES`).then(({data})=>{
                    data.tracks.forEach(element => {
                      newArr.push({'track':element})
                      setTracks(newArr)
                    });
                    navigate('/player')
                  })
                }}
              />
            );
          })}
          </div>
          </div>
        </div>
      </div>
      <Bottomcontroller/>
    </div>
  );
};

export default Search;
