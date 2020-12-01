import React, { useState, useRef } from "react";
import { Row, Col } from "antd";
import moment from "moment";
import Video from "../../components/Video";
import Form from "../../components/Video/Form";
let incidents = [];

const VideoGalley = (props) => {
  const videoRef = useRef();
  const setMakersByIncidents = () => {
    videoRef.current.setMakersByIncidents([]);
  };
  return (
    <Row gutter={32}>
      <Col xs={24} md={18}>
        <Video ref={videoRef} incidents={incidents} />
      </Col>
      <Col xs={24} sm={6}>
        <Form />
      </Col>
    </Row>
  );
};

export default VideoGalley;
