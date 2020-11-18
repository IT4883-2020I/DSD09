import React, { useState, useEffect } from "react";
import to from "await-to-js";
import userService from "@services/userService";
import {Table, Tag, Space, Form, Col, Select, DatePicker, Input, Row} from "antd";
import useBaseHook from "@hooks/BaseHooks";
import moment from'moment'
import Images from "../../components/Images";
import GGMap from "../../components/GGMap";

const {Option} = Select
const columns = [
  {
    name: "Tên sự cố",
    dataIndex: "title",
    key: "title",
    render: (text) => <a>{text}</a>,
  },
  // {
  //   title: "Mô tả",
  //   dataIndex: "description",
  //   key: "description",
  // },
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
    render: (text => {
      switch (text) {
        case 'open': return <Tag color="default">{text}</Tag>
        case 'inProcess': return <Tag color="processing">{text}</Tag>
        case 'resolve': return <Tag color="warning">{text}</Tag>
        case 'close': return <Tag color="success">{text}</Tag>
      }
    })
  },
  {
    title: "Mức độ",
    dataIndex: "level", // 'normal', 'urgency'
    key: "level",
    render: (text => {
      switch (text) {
        case 'normal': return <Tag color="#2db7f5">{text}</Tag>
        case 'urgency': return <Tag color="#f50">{text}</Tag>
      }
    })
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
    loggedTime: 0

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
    loggedTime: '4h'

  },
  {
    title: 'Cây đổ vào chạm biến áp trên quốc lộ 32 km16',
    description: 'Điển hình, lúc 14h55’ ngày 15/4, tại khoảng cột 435/37, đường dây 471E58 của thôn Đắc Tà Vầng, xã Đắc Tôi, huyện Nam Giang, diều của người dân quanh khu vực thả lên bị đứt dây và vướng vào lưới điện, gây sự cố đường dây cấp điện một phần khu vực huyện.',
    reporter: 'Nguyễn Dung',
    assignee: 'Việt Anh',
    status: 'inProcess',
    level: 'urgency',
    startAt: '',
    dueDate: '',
    loggedTime: '4h'

  }
]
const formLayout = {

}
const IncidentEdit = () => {
  const [loading, setLoading] = useState(false);
  const { notify, getData } = useBaseHook();
  const users = [
    {value: '1', label: 'Dung Nguyen'},
    {value: '2', label: 'Viet Anh'},
    {value: '3', label: 'Luan Phung'},
    {value: '4', label: 'Huy Tran'}
  ]

  return (
      <div>
        <Row gutter={16} justify={'space-around'}>
          <Col col={18}>
            <Form layout={'vertical'}>
              <Form.Item label={'Tên sự cố'}><Input value={'Cây đổ vào chạm biến áp trên quốc lộ 32 km16'}></Input></Form.Item>
              <Form.Item label={'Mô tả'}><Input.TextArea rows={4} value={'Lúc 14h55’ ngày 15/4, tại khoảng cột 435/37, đường dây 471E58 của thôn Đắc Tà Vầng, xã Đắc Tôi, huyện Nam Giang, diều của người dân quanh khu vực thả lên bị đứt dây và vướng vào lưới điện, gây sự cố đường dây cấp điện một phần khu vực huyện.'}></Input.TextArea></Form.Item>
              <Form.Item label={'Ảnh'}><Images/></Form.Item>
              <Form.Item label={'Vị trí'}><Input value={'km16 Quốc lộ 32, Huyện Hoài Đức, Hà Nội'}/></Form.Item>
              <Form.Item><GGMap/></Form.Item>

            </Form>
          </Col>
          <Col col={6}>
            <Tag>Lưới điện</Tag>
            <Tag color="processing">In Process</Tag>
            <Tag color="#f50">Urgency</Tag>
            <br/>
            <br/>
            <Form layout={'vertical'}>
              <Form.Item label={'Người tạo'}><Tag>Hệ thống</Tag></Form.Item>
              <Form.Item label={'Người phân công'}><Select value={'1'}>{users.map(u => <Option value={u.value} label={u.label}/>)}</Select></Form.Item>
              <Form.Item label={'Người được phân công'}><Select value={'2'}>{users.map(u => <Option value={u.value} label={u.label}/>)}</Select></Form.Item>
              <Form.Item label={'Logged Time'}><Input value={'4'}/></Form.Item>
              <Form.Item label={'Due Date'}><DatePicker defaultValue={moment('2020/01/01', 'YYYY/MM/DD')} format={'YYYY/MM/DD'} /></Form.Item>

            </Form>
            </Col>
        </Row>

      </div>
  )
};

export default IncidentEdit;
