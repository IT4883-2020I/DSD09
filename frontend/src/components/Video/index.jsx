import React, { useEffect, useImperativeHandle } from "react";
import "video.js/dist/video-js.css";

import "videojs-watermark/dist/videojs-watermark.css";
import "videojs-caption/dist/videojs.caption.css";
import "videojs-markers/dist/videojs.markers.css";

import videojs from "video.js";
import "videojs-markers";

const SOURCES = [
  {
    src: "//vjs.zencdn.net/v/oceans.mp4",
    type: "video/mp4"
  },
  {
    src: "//vjs.zencdn.net/v/oceans.webm",
    type: "video/webm"
  },
  {
    src: "//vjs.zencdn.net/v/oceans.ogg",
    type: "video/ogg"
  }
];

var options = {};
var player;
let markers = [];
const Video = React.forwardRef(
    (
      props,
      ref
    ) =>  {
  const { poster = "//vjs.zencdn.net/v/oceans.png", sources = SOURCES } = props;
  
  useEffect(() => {
    player = videojs("incident-video", options);
    // debugger
    console.log("player.markers ", player.markers);
  }, []);

  const setMakers = (markers = []) => {
    player.markers.reset(markers);
  };
  useImperativeHandle(ref, () => ({
    setMakersByIncidents(incidents = []) {
        setMakers([{ time: 8.1, text: "this", overlayText: "I'm new" }])
    },
  }));

  return (
    <div>
      <video
        id="incident-video"
        className="video-js"
        controls
        preload="auto"
        poster={poster}
        data-setup="{}"
        {...props}
      >
        {sources.map((item, index) => (
          <source key={index} src={item.src} type={item.type}></source>
        ))}
        <p className="vjs-no-js">
          To view this video please enable JavaScript, and consider upgrading to
          a web browser that
          <a href="https://videojs.com/html5-video-support/" target="_blank">
            supports HTML5 video
          </a>
        </p>
      </video>
    </div>
  );
});
export default Video;