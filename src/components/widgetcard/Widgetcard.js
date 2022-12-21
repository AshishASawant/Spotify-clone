import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../spotify";
import musicContext from "../../state/musicContext";
import "./widgetcard.css";

const Widgetcard = ({ title, data, subtitle }) => {

  const navigate=useNavigate()
  const context=useContext(musicContext)
  const {setTracks}=context

  const getAtist=(id)=>{
    let newArr=[]
    apiClient.get(`artists/${id}/top-tracks?market=ES`).then(({data})=>{
      data.tracks.forEach(element => {
        newArr.push({'track':element})
        setTracks(newArr)
      });
  })
}

  const getAlbum=(id,url)=>{
    let newArr=[]
    apiClient.get(`albums/${id}/tracks`).then(({data})=>{
      console.log(data)
      data.items.forEach(element => {
        newArr.push({'track':{...element,'album':{...element,'images':[{url}]}}})
        setTracks(newArr)
      });
    })
  }
  const getplayList=(id)=>{
    navigate('/player',{state:{id}})
  }

  return (
    <div className="widget-card">
      <p className="widget-title">{title}</p>
      <div className="of-container">
        {data.map((item, i) => {
          return (
            <div className="widget-body" onClick={() =>{
              if (item.type==='artist') {
                getAtist(item.id)
              }
              else if(item.type==='album'){
                getAlbum(item.id,item.images[0]?.url)
              }
              else{
                getplayList(item.id)
              }
            }} key={i}>
              <img
                src={item?.images[2]?.url || item.images[0]?.url || ""}
                alt="Album"
                className="widget-img"
              />
              <div className="widget-text">
                <p className="widget-name">{item.name}</p>
                <p className="widget-subname">
                  {item.followers?.total ||
                    item.tracks?.total ||
                    item.artists[0]?.name ||
                    ""}{" "}
                  {subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Widgetcard;
