import React, {  useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";
import { MdDashboard, MdLibraryMusic } from "react-icons/md";
import { RiPlayList2Fill } from "react-icons/ri";
import { FaPlay,FaSearch } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import apiClient from "../../spotify";


const Sidebar = () => {
  const location = useLocation();
  useEffect(() => {
    apiClient.get("me").then(({ data }) => {
      if (data.images.length) {
        document.querySelector(
          ".user-image"
        ).style.backgroundImage = `url(${data.images[0].url})`;
      }
    });
  }, []);

  return (
    <div className="sidebar">
      <div className="user-image"></div>
      <div className="nav-btns">
        <div
          className={`btn-body ${
            location.pathname === "/categorie" ? "active" : ""
          }`}
        >
          <Link to="/categorie">
            <MdDashboard size={28} />
            <p className="btn-text">Categories</p>
          </Link>
        </div>
        <div
          className={`btn-body ${
            location.pathname === "/playlist" ? "active" : ""
          }`}
        >
          <Link to="/playlist">
            <RiPlayList2Fill size={28} />
            <p className="btn-text">Playlist</p>
          </Link>
        </div>
        <div
          className={`btn-body ${
            location.pathname === "/player" ? "active" : ""
          }`}
        >
          <Link to="/player">
            <FaPlay size={28} />
            <p className="btn-text">Player</p>
          </Link>
        </div>
        <div
          className={`btn-body ${
            location.pathname === "/search" ? "active" : ""
          }`}
        >
          <Link to="/search">
            <FaSearch size={28} />
            <p className="btn-text">Search</p>
          </Link>
        </div>
        <div
          className={`btn-body ${
            location.pathname === "/library" ? "active" : ""
          }`}
        >
          <Link to="/library">
            <MdLibraryMusic size={28} />
            <p className="btn-text">Library</p>
          </Link>
        </div>
      </div>
      <div
        className={`btn-body ${
          location.pathname === "/signout" ? "active" : ""
        }`}
      >
        <Link
          to="/login"
          onClick={() => {
            localStorage.removeItem("token");
            location.reload()
          }}
        >
          <FiLogOut size={28} />
          <p className="btn-text">Signout</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
