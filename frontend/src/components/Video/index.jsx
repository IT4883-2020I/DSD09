import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from "react";

const SOURCES = [
    {
        src: '//vjs.zencdn.net/v/oceans.mp4',
        type: 'video/mp4'
    },
    {
        src: '//vjs.zencdn.net/v/oceans.webm',
        type: 'video/webm'
    },
    {
        src: '//vjs.zencdn.net/v/oceans.ogg',
        type: 'video/ogg'
    },

]

const Video =(props) => {
    const {poster = "//vjs.zencdn.net/v/oceans.png", sources = SOURCES} = props

  return (
      <video
          id="my-player"
          className="video-js"
          controls
          preload="auto"
          poster={poster}
          data-setup='{}'
          {...props}
      >
          {sources.map(item => <source src={item.src} type={item.type}></source>)}
          <p className="vjs-no-js">
              To view this video please enable JavaScript, and consider upgrading to a
              web browser that
              <a href="https://videojs.com/html5-video-support/" target="_blank">
                  supports HTML5 video
              </a>
          </p>
      </video>
  );
}
export default Video