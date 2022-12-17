import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";
import { MdDashboard, MdFavorite, MdLibraryMusic } from "react-icons/md";
import { RiFireFill } from "react-icons/ri";
import { FaPlay } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import apiClient from "../../spotify";
const Sidebar = () => {
  const location = useLocation();
  useEffect(() => {
    apiClient.get("me").then(({ data }) => 
    {
    console.log(data)
    if(data.images.length){
        document.querySelector(".user-image").style.backgroundImage=`url(${data.images[0].url})`
    }
    });
  }, []);

  return (
    <div className="sidebar">
      <div className="user-image"></div>
      <div className="nav-btns">
        <div
          className={`btn-body ${
            location.pathname === "/feed" ? "active" : ""
          }`}
        >
          <Link to="/feed">
            <MdDashboard size={28} />
            <p className="btn-text">Feed</p>
          </Link>
        </div>
        <div
          className={`btn-body ${
            location.pathname === "/trending" ? "active" : ""
          }`}
        >
          <Link to="/trending">
            <RiFireFill size={28} />
            <p className="btn-text">Trending</p>
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
            location.pathname === "/favourite" ? "active" : ""
          }`}
        >
          <Link to="/favourite">
            <MdFavorite size={28} />
            <p className="btn-text">Favourite</p>
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
        <Link to="/signout">
          <FiLogOut size={28} />
          <p className="btn-text">Signout</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
