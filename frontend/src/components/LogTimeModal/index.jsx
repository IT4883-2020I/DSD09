// import { Modal, Button } from 'antd';
// import React, { useState, useEffect } from "react";
//
// const  LogTimeModal = () => {
//     const [visible, setVisible] = useState()
//     state = { visible: false };
//
//     showModal = () => {
//         this.setState({
//             visible: true,
//         });
//     };
//
//     handleOk = e => {
//         console.log(e);
//         this.setState({
//             visible: false,
//         });
//     };
//
//     handleCancel = e => {
//         console.log(e);
//         this.setState({
//             visible: false,
//         });
//     };
//
//     render() {
//         return (
//             <>
//                 <Button type="primary" onClick={this.showModal}>
//                     Open Modal
//                 </Button>
//                 <Modal
//                     title="Basic Modal"
//                     visible={this.state.visible}
//                     onOk={this.handleOk}
//                     onCancel={this.handleCancel}
//                 >
//                     <p>Some contents...</p>
//                     <p>Some contents...</p>
//                     <p>Some contents...</p>
//                 </Modal>
//             </>
//         );
//     }
// }