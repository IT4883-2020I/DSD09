import React, {useState, useEffect} from "react";
import to from "await-to-js";
import userService from "@services/userService";
import {Table, Tag, Space} from "antd";
import useBaseHook from "@hooks/BaseHooks";

const columns = [
    {
        name: "Tên sự cố",
        dataIndex: "title",
        key: "title",
        render: (text) => <a href={'/incidents/1'}>{text}</a>,
    },
    // {
    //   title: "Mô tả",
    //   dataIndex: "description",
    //   key: "description",
    // },
    {
        title: "Người phân công",
        dataIndex: "reporter",
        key: "reporter"
    },
    {
        title: "Người được phân công",
        dataIndex: "assignee",
        key: "assignee"
    },
    {
        title: "Trạng thái",
        dataIndex: "status", // 'open', 'inProcess', 'resolve', 'close'
        key: "status",
        render: (text) => {
            switch (text) {
                case "open":
                    return <Tag color="default">{text}</Tag>;
                case "inProcess":
                    return <Tag color="processing">{text}</Tag>;
                case "resolve":
                    return <Tag color="warning">{text}</Tag>;
                case "close":
                    return <Tag color="success">{text}</Tag>;
            }
        }
    },
    {
        title: "Mức độ",
        dataIndex: "level", // 'normal', 'urgency'
        key: "level",
        render: (text) => {
            switch (text) {
                case "normal":
                    return <Tag color="#2db7f5">{text}</Tag>;
                case "urgency":
                    return <Tag color="#f50">{text}</Tag>;
            }
        }
    },
    {
        title: "Người tạo",
        dataIndex: "createdBy",
        key: "createdBy",
    },
    {
        title: "Ngày dự kiến hoàn thành",
        dataIndex: "dueDate",
        key: "dueDate"
    },
    {
        title: "Thời gian đã xử lý sự cố",
        dataIndex: "loggedTime", //Nhân viên phải log time chi tiết về việc xử lý sự cố: (từ mấy h - đến mấy h, đã làm gì)
        key: "loggedTime"
    }
];

const data = [
    {
        title: 'Trộm thanh giằng cột tại lưới điện cao thế THANH HÓA',
        description: ' Đội đường dây chi nhánh phát hiện kẻ gian tháo trộm thanh giằng cột với số lượng lớn (56 thanh)',
        reporter: 'Nguyễn Dung',
        assignee: 'Việt Anh',
        status: 'open',
        level: 'normal',
        startAt: '',
        dueDate: '',
        loggedTime: 0,
        createdBy: 'Hệ thống'

    },
    {
        title: 'Thả diều gây sự cố lưới điện',
        description: 'Điển hình, lúc 14h55’ ngày 15/4, tại khoảng cột 435/37, đường dây 471E58 của thôn Đắc Tà Vầng, xã Đắc Tôi, huyện Nam Giang, diều của người dân quanh khu vực thả lên bị đứt dây và vướng vào lưới điện, gây sự cố đường dây cấp điện một phần khu vực huyện.',
        reporter: 'Nguyễn Dung',
        assignee: 'Việt Anh',
        status: 'inProcess',
        level: 'urgency',
        startAt: '',
        dueDate: '',
        loggedTime: '4h',
        createdBy: 'Luân Phùng'


    },
    {
        title: 'Cây đổ vào chạm biến áp trên quốc lộ 32 km16',
        description: 'Lúc 14h55’ ngày 15/4, tại khoảng cột 435/37, đường dây 471E58 của thôn Đắc Tà Vầng, xã Đắc Tôi, huyện Nam Giang, diều của người dân quanh khu vực thả lên bị đứt dây và vướng vào lưới điện, gây sự cố đường dây cấp điện một phần khu vực huyện.',
        reporter: 'Nguyễn Dung',
        assignee: 'Việt Anh',
        status: 'inProcess',
        level: 'urgency',
        startAt: '',
        dueDate: '',
        loggedTime: '4h',
        createdBy: 'Dung Nguyễn'
    }, {
        title: "Trộm thanh giằng cột tại lưới điện cao thế THANH HÓA",
        description:
            " Đội đường dây chi nhánh phát hiện kẻ gian tháo trộm thanh giằng cột với số lượng lớn (56 thanh)",
        reporter: "Nguyễn Dung",
        assignee: "Việt Anh",
        status: "open",
        level: "normal",
        startAt: "",
        dueDate: "",
        loggedTime: 0
    },
    {
        title: "Thả diều gây sự cố lưới điện",
        description:
            "Điển hình, lúc 14h55’ ngày 15/4, tại khoảng cột 435/37, đường dây 471E58 của thôn Đắc Tà Vầng, xã Đắc Tôi, huyện Nam Giang, diều của người dân quanh khu vực thả lên bị đứt dây và vướng vào lưới điện, gây sự cố đường dây cấp điện một phần khu vực huyện.",
        reporter: "Nguyễn Dung",
        assignee: "Việt Anh",
        status: "inProcess",
        level: "urgency",
        startAt: "",
        dueDate: "",
        loggedTime: "4h"
    },
    {
        title: "Cây đổ vào Trạm điện cao thế Ngọc Liên",
        description:
            "Điển hình, lúc 14h55’ ngày 15/4, tại khoảng cột 435/37, đường dây 471E58 của thôn Đắc Tà Vầng, xã Đắc Tôi, huyện Nam Giang, diều của người dân quanh khu vực thả lên bị đứt dây và vướng vào lưới điện, gây sự cố đường dây cấp điện một phần khu vực huyện.",
        reporter: "Nguyễn Dung",
        assignee: "Việt Anh",
        status: "inProcess",
        level: "urgency",
        startAt: "",
        dueDate: "",
        loggedTime: "4h"
    }
];
const Incident = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const {notify, getData} = useBaseHook();
    useEffect(() => {
        async function fetch() {
            let [error, _users = []] = await to(userService().withAuth().index());
            setLoading(false);
            if (error) {
                notify(error.message, "", "error");
                return;
            }
            console.log("_users ", _users);
            setUsers(_users);
        }

        fetch();
        // code to run on component mount
    }, []);
    return <Table columns={columns} loading={loading} dataSource={data}/>;
};

export default Incident;
