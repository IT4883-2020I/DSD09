import React, { useState, useEffect } from "react";
import to from "await-to-js";
import userService from "@services/userService";
import {Table, Tag, Space, Form, Col, Select, DatePicker, Input, Row} from "antd";
import useBaseHook from "@hooks/BaseHooks";
import moment from'moment'
import Images from "../../components/Images";
import GGMap from "../../components/GGMap";

const {Option} = Select

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
              <Form.Item label={'Tên sự cố'}><Input value={'Cây đổ vào Trạm điện cao thế Ngọc Liên6'}></Input></Form.Item>
              <Form.Item label={'Mô tả'}><Input.TextArea rows={4} value={'Lúc 14h55’ ngày 15/4, tại khoảng cột 435/37, đường dây 471E58 của thôn Đắc Tà Vầng, xã Đắc Tôi, huyện Nam Giang, diều của người dân quanh khu vực thả lên bị đứt dây và vướng vào lưới điện, gây sự cố đường dây cấp điện một phần khu vực huyện.'}></Input.TextArea></Form.Item>
              <Form.Item label={'Ảnh'}><Images/></Form.Item>
              <Form.Item label={'Vị trí'}><Input value={'Trạm điện cao thế Ngọc Liên'}/></Form.Item>
              <Form.Item>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.5756715163598!2d106.1600463149287!3d20.96954899517287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313598a919dd3821%3A0x5ba5e686fd49047!2zVHLhuqFtIMSRaeG7h24gY2FvIHRo4bq_IE5n4buNYyBMacOqbg!5e0!3m2!1sen!2s!4v1605663218115!5m2!1sen!2s"
                    width="100%" height="450" frameBorder="0" style={{border: 0}} allowFullScreen="" aria-hidden="false"
                    tabIndex="0"></iframe></Form.Item>

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
              <Form.Item label={'Người phân công'}><Select value={'1'}>{users.map(u => <Option value={u.value}>{u.label}</Option>)}</Select></Form.Item>
              <Form.Item label={'Người được phân công'}><Select value={'2'}>{users.map(u => <Option value={u.value}>{u.label}</Option>)}</Select></Form.Item>
              <Form.Item label={'Logged Time'}><Input value={'4'}/></Form.Item>
              <Form.Item label={'Due Date'}><DatePicker defaultValue={moment('2020/01/01', 'YYYY/MM/DD')} format={'YYYY/MM/DD'} /></Form.Item>

            </Form>
            </Col>
        </Row>

      </div>
  )
};

export default IncidentEdit;
