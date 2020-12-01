import { List, Avatar, Checkbox, Button, Modal } from "antd";
import TagGroup from "./TagGroup";
import CreateIncidentModel from "../Model/CreateIncidentModel";
import React, { useState, useRef } from "react";
let defaultTags = [];
let currentIndex = -1;
const VideoList = ({ incidents = [], onChangeTags }) => {
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [visible, setVisible] = useState(false);

  let tagRef = useRef();
  let createRef = useRef();
  const onCheck = (e, index) => {
    let _selects = [];
    if (e.target.checked) {
      _selects = selectedVideos.concat([index]);
    } else {
      _selects = selectedVideos.filter((item) => item !== index);
    }
    setSelectedVideos([..._selects]);
  };
  const handleOk = async () => {
    let tags = tagRef.getTags() || [];
    if (incidents[currentIndex]) {
      incidents[currentIndex].tags = tags;
      incidents[currentIndex].text = tags.toString();
      onChangeTags(incidents);
    }
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const onClickEdit = (tags = [], index) => {
    defaultTags = tags;
    currentIndex = index;
    setVisible(true);
  };
  const onCreateIncident = () => {
    let allTags = [];
    for(let incident of incidents){
      allTags = allTags.concat(incident.tags || [])
    }
    createRef.setDefaultValue({tags: allTags})
    createRef.show();
  };
  return (
    <div>
      <Button
        type="primary"
        disabled={!selectedVideos.length}
        onClick={onCreateIncident}
      >
        Tạo sự cố
      </Button>
      <List
        itemLayout="horizontal"
        dataSource={incidents}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Checkbox
                key="select"
                onChange={(event) => onCheck(event, index)}
              >
                Chọn
              </Checkbox>,
              <a key="edit" onClick={() => onClickEdit(item.tags, index)}>
                Sửa nhãn
              </a>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src="https://i.imgur.com/EFPQbF4.jpeg" />}
              title={<a href="https://ant.design">{"Video " + (index + 1)}</a>}
              description={`Start time: ${item.time} - Duration: ${item.duration}. Các nhãn: ${item.text}`}
            />
          </List.Item>
        )}
      />
      <Modal
        title="Sửa nhãn sự cố"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <TagGroup
          defaultValue={defaultTags}
          ref={(instance) => {
            tagRef = instance;
          }}
        />
      </Modal>
      <CreateIncidentModel
        ref={(instance) => {
          createRef = instance;
        }}
      />
    </div>
  );
};

export default VideoList;
