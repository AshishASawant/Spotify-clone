import React, { useState, useEffect } from "react";
import apiClient from "../../spotify";
import Widgetcard from "../widgetcard/Widgetcard";
import "./widget.css";

const Widget = ({ artistId }) => {
  const [similar, setSimilar] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [newRelease, setNewRelease] = useState([]);

  useEffect(() => {
    if (artistId) {
      apiClient
        .get(`/artists/${artistId}/related-artists`)
        .then((res) => {
          const a = res.data?.artists.slice(0, 3);
          setSimilar(a);
        })
        .catch((err) => console.error(err));

      apiClient
        .get(`/browse/featured-playlists`)
        .then((res) => {
          const a = res.data?.playlists.items.slice(0, 3);
          setFeatured(a);
        })
        .catch((err) => console.error(err));

      apiClient
        .get(`/browse/new-releases`)
        .then((res) => {
          const a = res.data?.albums.items.slice(0, 3);
          setNewRelease(a);
        })
        .catch((err) => console.error(err));
    }
  }, [artistId]);

  return (
    <div className="widget-container">
      <Widgetcard title="Similar Artists" data={similar} subtitle={"Followers"}/>
      <Widgetcard title="Made For You" data={featured} subtitle={"Songs"}/>
      <Widgetcard title="New Releases" data={newRelease} subtitle={""}/>
    </div>
  );
};

export default Widget;
