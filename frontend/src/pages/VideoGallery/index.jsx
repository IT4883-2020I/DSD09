import React, { useState, useRef } from "react";
import { Row, Col } from "antd";
import moment from "moment";
import Video from "../../components/Video";
import Form from "../../components/Video/Form";
let incidents = [];

const VideoGalley = (props) => {
  const videoRef = useRef();
  const setMakersByIncidents = (incidents) => {
    videoRef.current.setMakersByIncidents(incidents);
  };
  const onStartIncident = () => {
    let currentTime = videoRef.current.currentTime();
    incidents.push({
      time: currentTime,
      isFinish: false,
      text: "",
      duration: 1,
      overlayText: "I'm new",
    });
    setMakersByIncidents(incidents);
  };

  const onStopIncident = (tags = []) => {
    let currentIncident = incidents.find(item => !item.isFinish);
    incidents = incidents.filter(item => item.isFinish);
    if(!currentIncident) return;
    currentIncident.isFinish= true;
    let currentTime = videoRef.current.currentTime() || 0;
    currentIncident.duration = currentTime - currentIncident.time || 0;
    currentIncident.text = tags.toString();
    incidents.push(currentIncident);
    setMakersByIncidents(incidents);
  };

  return (
    <Row gutter={32}>
      <Col xs={24} md={18}>
        <Video ref={videoRef} incidents={incidents} />
      </Col>
      <Col xs={24} sm={6}>
        <Form
          onStartIncident={onStartIncident}
          onStopIncident={onStopIncident}
        />
      </Col>
    </Row>
  );
};

export default VideoGalley;
