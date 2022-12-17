import React, { useEffect, useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Player from "./pages/player/Player";
import Feed from "./pages/feed/Feed";
import Trending from "./pages/trending/Trending";
import Library from "./pages/library/Library";
import Favourite from "./pages/favourite/Favourite";

import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import { setClientToken } from "./spotify";

const App = () => {

  const [token, setToken] = useState('')

  useEffect(() => {
    let token = localStorage.getItem("token");
    let hash=window.location.hash
    window.location.hash=''
    if(hash){
      const newtoken=hash.split('&')[0].split('=')[1]
      console.log(newtoken)
      localStorage.setItem('token',newtoken)
      setToken(newtoken)
      setClientToken(newtoken)
    }
    else{
      setToken(token)
      setClientToken(token)
    }
  
  }, [])
  
  
  return (token?
    <div className="app">
      <Sidebar />
      <Routes>
        <Route exact path="/" element={<Navigate to='/player'/> }></Route>
        <Route exact path="/player" element={<Player />}></Route>
        <Route exact path="/feed" element={<Feed/>}></Route>
        <Route exact path="/favourite" element={<Favourite/>}></Route>
        <Route exact path="/trending" element={<Trending />}></Route>
        <Route exact path="/library" element={<Library/>}></Route>
      </Routes>
    </div>:<Login/>
  );
};

export default App;
