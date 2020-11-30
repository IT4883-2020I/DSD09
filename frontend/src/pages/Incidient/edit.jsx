import React, { useState, useEffect } from "react";
import {Tag, Form, Col, Select, DatePicker, Input, Row, Button, message, Descriptions} from "antd";
import useBaseHook from "@hooks/BaseHooks";
import moment from'moment'
import Images from "../../components/Images";
import _ from 'lodash'
import {useParams} from 'react-router-dom'
import to from "await-to-js";
import incidentService from "@services/incidentService";
import incidentLevelService from "@services/incidentLevelService";
import incidentStatusService from "@services/incidentStatusService";
const {Option} = Select

const IncidentEdit = (props) => {
  let { id } = useParams();
  const [incident, setIncident] = useState({})
  const [levels, setLevels] = useState([])
  const [status, setStatus] = useState([])
  const users = [
    {value: '1', label: 'Dung Nguyen'},
    {value: '2', label: 'Viet Anh'},
    {value: '3', label: 'Luan Phung'},
    {value: '4', label: 'Huy Tran'}
  ]

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = async () => {
    let [error, incident] = await to(incidentService().detail(id))
    let [error1, _levels] = await to(incidentLevelService().index())
    let [error2, _status] = await to(incidentStatusService().index())
    if(error) message.error('Không thể trả về thông tin sự cố!')
    if(error1) message.error('Không thể trả về danh sách mức độ sự cố!')
    setIncident(incident || {})
    setLevels(_levels)
    setStatus(_status)
    console.log('incident', incident)
  }

  const colorStatus = (code) => {
    switch (code) {
      case 0:
        return "default"
      case 1:
        return "processing"
      case 2:
        return "warning"
      case 3:
        return "success"
      default: return ''
    }
  }
  const colorLevel = (code) => {
    switch (code) {
      case 0:
        return "#2db7f5"
      case 1:
        return "#f50"
      default: return ''
    }
  }

  return (
      <div>
        <Descriptions
            bordered
            title="Chi tiết sự cố"
            extra={<Button type="primary">Xử lý sự cố</Button>}
        >
          <Descriptions.Item label="Tên sự cố">{incident.name}</Descriptions.Item>
          <Descriptions.Item label="Loại sự cố">{_.get(incident, 'type.name', '')}</Descriptions.Item>
          <Descriptions.Item label="Trạng thái">
            <Tag color={colorLevel(_.get(incident, 'status.code', null))}>
              {_.get(incident, 'status.name', '')}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Mức độ">
            <Tag color={colorLevel(_.get(incident, 'level.code', null))}>
              {_.get(incident, 'level.name', '')}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Hạn dự kiến">{moment(incident.dueDate).format('YYYY-MM-DD')}</Descriptions.Item>
          <Descriptions.Item label="Ngày tạo">{moment(incident.createdAt).format('YYYY-MM-DD')}</Descriptions.Item>
          <Descriptions.Item label="Mô tả">
            {incident.description}
          </Descriptions.Item>
          <Descriptions.Item label="Vị trí">
            {incident.location}
          </Descriptions.Item>
          <Descriptions.Item label="Ảnh">
            {incident.location}
          </Descriptions.Item>
        </Descriptions>
        {/*<Row gutter={16} justify={'space-around'}>*/}
        {/*  <Col col={18}>*/}
        {/*    <Form layout={'vertical'}>*/}
        {/*      <Form.Item label={'Tên sự cố'}><Input value={'Cây đổ vào Trạm điện cao thế Ngọc Liên'}></Input></Form.Item>*/}
        {/*      <Form.Item label={'Mô tả'}><Input.TextArea rows={4} value={'Lúc 14h55’ ngày 15/4, tại khoảng cột 435/37, đường dây 471E58 của thôn Đắc Tà Vầng, xã Đắc Tôi, huyện Nam Giang, diều của người dân quanh khu vực thả lên bị đứt dây và vướng vào lưới điện, gây sự cố đường dây cấp điện một phần khu vực huyện.'}></Input.TextArea></Form.Item>*/}
        {/*      <Form.Item label={'Ảnh'}><Images/></Form.Item>*/}
        {/*      <Form.Item label={'Vị trí'}><Input value={'Trạm điện cao thế Ngọc Liên'}/></Form.Item>*/}
        {/*      <Form.Item>*/}
        {/*        <iframe*/}
        {/*            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.5756715163598!2d106.1600463149287!3d20.96954899517287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313598a919dd3821%3A0x5ba5e686fd49047!2zVHLhuqFtIMSRaeG7h24gY2FvIHRo4bq_IE5n4buNYyBMacOqbg!5e0!3m2!1sen!2s!4v1605663218115!5m2!1sen!2s"*/}
        {/*            width="100%" height="450" frameBorder="0" style={{border: 0}} allowFullScreen="" aria-hidden="false"*/}
        {/*            tabIndex="0"></iframe></Form.Item>*/}

        {/*    </Form>*/}
        {/*  </Col>*/}
        {/*  <Col col={6}>*/}
        {/*    <Tag>Lưới điện</Tag>*/}
        {/*    <Tag color="processing">In Process</Tag>*/}
        {/*    <Tag color="#f50">Urgency</Tag>*/}
        {/*    </Col>*/}
        {/*</Row>*/}

      </div>
  )
};

export default IncidentEdit;
