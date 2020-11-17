import React, { useState, useEffect } from "react";
import to from "await-to-js";
import userService from "@services/userService";
import { Table, Tag, Space } from "antd";
import useBaseHook from "@hooks/BaseHooks";
const columns = [
  {
    name: "Tên sự cố",
    dataIndex: "title",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Người phân công",
    dataIndex: "reporter",
    key: "reporter",
  },
  {
    title: "Người được phân công",
    dataIndex: "assignee",
    key: "assignee",
  },
  {
    title: "Trạng thái",
    dataIndex: "status", // 'open', 'inProcess', 'resolve', 'close'
    key: "status",
  },
  {
    title: "Mức độ",
    dataIndex: "level", // 'normal', 'urgency'
    key: "level",
  },
  {
    title: "Ngày tạo",
    dataIndex: "startAt",
    key: "startAt",
  },
  {
    title: "Ngày dự kiến hoàn thành",
    dataIndex: "dueDate",
    key: "dueDate",
  },
  {
    title: "Thời gian đã xử lý sự cố",
    dataIndex: "loggedTime", //Nhân viên phải log time chi tiết về việc xử lý sự cố: (từ mấy h - đến mấy h, đã làm gì)
    key: "loggedTime",
  },

];
const Incident = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { notify, getData } = useBaseHook();
  useEffect(() => {
    async function fetch() {
      let [error, _users = []] = await to(userService().withAuth().index());
      setLoading(false);
      if (error) {
        notify(error.message, "", "error");
        return;
      }
      console.log("_users ", _users)
      setUsers(_users);
    }
    fetch();
    // code to run on component mount
  }, []);
  return <Table columns={columns} loading = {loading} dataSource={users} />
};

export default Incident;
