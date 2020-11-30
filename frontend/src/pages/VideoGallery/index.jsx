import React, {useState, useEffect} from "react";
import to from "await-to-js";
import userService from "@services/userService";
import {
    InputNumber,
    Switch,
    Button,
    Checkbox,
    Table,
    Tag,
    Modal,
    Radio,
    Input,
    Form,
    Select,
    DatePicker,
    TreeSelect,
    message,
    Row
} from "antd";
import useBaseHook from "@hooks/BaseHooks";

import Gallery from 'react-grid-gallery';
import incidentLevelService from "@services/incidentLevelService";
import incidentService from "@services/incidentService";
import moment from "moment";
import Video from "../../components/Video";

const VideoGalley = (props) => {

    return (
        <Row>
            <Video/>
        </Row>
    )
}

export default VideoGalley;
