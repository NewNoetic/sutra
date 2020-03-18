import React, { Component } from "react";
import "./DemoVideo.css";
import Config from "./config.json";

class DemoVideo extends Component {
  render() {
    return (
      <div className="demo-video">
        <div className="phone-frame center-block">
          <video autoPlay loop muted controls preload poster={Config.demo_video_cover}>
            <source src={Config.demo_video} />
          </video>
        </div>
      </div>
    );
  }
}

export default DemoVideo;
