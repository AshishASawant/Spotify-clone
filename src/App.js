import React, {  useEffect, useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Player from "./pages/player/Player";
import Categorie from "./pages/categorie/Categorie";
import Library from "./pages/library/Library";

import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import { setClientToken } from "./spotify";
import Search from "./pages/search/Search";
import Playlist from "./pages/playlist/Playlist";

const App = () => {
  const [token, setToken] = useState("");
  useEffect(() => {
    let token = localStorage.getItem("token");
    let hash = window.location.hash;
    window.location.hash = "";
    if (hash) {
      const newtoken = hash.split("&")[0].split("=")[1];
      console.log(newtoken);
      localStorage.setItem("token", newtoken);
      setToken(newtoken);
      setClientToken(newtoken);
    } else {
      setToken(token);
      setClientToken(token);
    }
  }, []);

  return token ? (
    <div className="app">
      <Sidebar setToken={setToken}/>
      <Routes>
        <Route exact path="/" element={<Navigate to="/player" />}></Route>
        <Route exact path="/player" element={<Player />}></Route>
        <Route exact path="/categorie" element={<Categorie />}></Route>
        <Route exact path="/search" element={<Search />}></Route>
        <Route exact path="/playlist" element={<Playlist />}></Route>
        <Route exact path="/library" element={<Library />}></Route>
      </Routes>
    </div>
  ) : (
    <Login />
  );
};

export default App;
