import React from "react";
import "./widgetcard.css";
const Widgetcard = ({ title, data ,subtitle}) => {
  return (
    <div className="widget-card">
      <p className="widget-title">{title}</p>
      {data.map((item,i) => {
        return (
          <div className="widget-body" key={i}>
            {}
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
                  ""} {subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Widgetcard;
