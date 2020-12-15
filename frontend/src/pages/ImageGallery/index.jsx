import React, {useState, useEffect} from "react";
import to from "await-to-js";
import userService from "@services/userService";
import {
    Button,
    Checkbox,
    Modal,
    Input,
    Form,
    Select,
    DatePicker,
    message
} from "antd";
import useBaseHook from "@hooks/BaseHooks";

import Gallery from 'react-grid-gallery';
import incidentLevelService from "@services/incidentLevelService";
import incidentService from "@services/incidentService";
import imageService from "@services/imageService";
import moment from "moment";
const IMAGES =
    [
        {
            src: "https://res.cloudinary.com/webtt20191/image/upload/v1607243994/chay-rung/chay-rung-44.jpg",
            thumbnail: "https://res.cloudinary.com/webtt20191/image/upload/v1607243994/chay-rung/chay-rung-44.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 174,
            // isSelected: true,
            caption: "After Rain (Jeshu John - designerspics.com)"
        },
        {
            src: "https://anh.24h.com.vn/upload/4-2016/images/2016-12-17/1481955945-148195586910098-no-2.jpg",
            thumbnail: "https://anh.24h.com.vn/upload/4-2016/images/2016-12-17/1481955945-148195586910098-no-2.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 212,
            tags: [{value: "Ocean", title: "Ocean"}, {value: "People", title: "People"}],
            caption: "CHAY COT DIEN"
        },

        {
            src: "https://afamilycdn.com/150157425591193600/2020/9/29/06hvjm-16013610407751558716319-1601371294750-160137129504484028954.jpg",
            thumbnail: "https://afamilycdn.com/150157425591193600/2020/9/29/06hvjm-16013610407751558716319-1601371294750-160137129504484028954.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 212,
            caption: "DUT DAY DIEN"
        },
        {
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcQhUFN6raMGPq490OvJSVBXk60HfO3VKLOQ&usqp=CAU",
            thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcQhUFN6raMGPq490OvJSVBXk60HfO3VKLOQ&usqp=CAU",
            thumbnailWidth: 320,
            thumbnailHeight: 212,
            caption: "DO COT DIEN"
        },
        {
            src: "https://mb.dkn.tv/wp-content/uploads/2018/07/anh-4.jpg",
            thumbnail: "https://mb.dkn.tv/wp-content/uploads/2018/07/anh-4.jpg",
            thumbnailWidth: 320,
            thumbnailHeight: 212,
            caption: "Chim dau cot dien"
        }]
let levels = []
const ImageGalley = (props) => {
    const [images, setImages] = useState([])
    const [selectAllChecked, setSelectAllChecked] = useState(false)
    const [visible, setVisible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [form] = Form.useForm()
    const [selectedIds, setSelectedIds] = useState([])

    useEffect(() => {
        fetchLevels()
    }, [])

    const fetchLevels = async () => {
        console.log('fetch level')
        let [leverRes = {}, imagesRes = []] = await (Promise.all([
            incidentLevelService().index(),
            imageService().getImagesByMonitoredId({id: ''})
        ]))
        console.log('images', imagesRes)
        console.log('leverRes', leverRes)
        levels = leverRes
        if(imagesRes.status == 200) {
            let _images = (imagesRes.result || []).map((item) => {
                let createdAt = moment(item.createdAt).format('DD/MM/YYYY hh:mm:ss')
                let nameType = ''
                switch (item.problemType) {
                    case 0: nameType = 'Cháy rừng';break
                    case 1: nameType = 'Đê điều';break
                    case 2: nameType = 'Lưới điện';break
                    case 3: nameType = 'Cây trồng';break
                    default: nameType = ''
                }
                return {
                    ...item,
                    src: item.link,
                    caption: item.title,
                    thumbnailWidth: 320,
                    thumbnailHeight: 212,
                    thumbnail: item.link,
                    tags: [{value: createdAt, title: 'Created At'}, {value: nameType, title: "Type"}],

                }
            })
            setImages(_images)
        } else {
            message.error(leverRes.message)
        }

    }
    const allImagesSelected = (_images) => {
        return _images.filter((img) => Boolean(img.isSelected)).length == _images.length;
    }

    const onSelectImage = (index, image) => {
        let _images = images.slice();
        let img = _images[index];
        img.hasOwnProperty("isSelected") ? img.isSelected = !img.isSelected : img.isSelected = true
        setImages(_images)
        allImagesSelected(images) ? setSelectAllChecked(true) : setSelectAllChecked(false)
    }

    const getSelectedImages = () => {
        let selected = [];
        for (let i = 0; i < images.length; i++)
            if (images[i].isSelected == true)
                selected.push(i);
        return selected;
    }

    const onClickSelectAll = () => {
        let _selectAllChecked = !selectAllChecked;
        setSelectAllChecked(_selectAllChecked)

        let _images = images.slice();
        if (_selectAllChecked) {
            for (let i = 0; i < images.length; i++)
                _images[i].isSelected = true;
        } else {
            for (let i = 0; i < images.length; i++)
                _images[i].isSelected = false;

        }
        setImages([..._images])
    }

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = async () => {
        setConfirmLoading(true);
        let selectedImages = images.filter((item) => Boolean(item.isSelected))
        form.validateFields().then(async values => {
            console.log('values', values)
            let [error, res] = await to(incidentService().create({
                ...values,
                dueDate: moment(values.dueDate).format('YYYY-MM-DD'),
                images: selectedImages,
                type: "LUOI_DIEN"
            }))
            if(error) message.error('Đã có lỗi xảy ra!')
            message.success('Sự cố đã được tạo mới!')
            setConfirmLoading(false)
            setVisible(false)

        })
            .catch(errorInfo => {
                console.log('errorInfo', errorInfo)
                setConfirmLoading(false)
            })

    };

    const handleCancel = () => {
        setVisible(false);
    };
    return <div>
        <Checkbox onChange={onClickSelectAll} checked={selectAllChecked}>Select All</Checkbox>
        <Button disabled={!getSelectedImages().length} type={'primary'} onClick={showModal}>Tạo sự cố</Button>
        <div style={{
            padding: "2px",
            color: "#666"
        }}>Selected images: {getSelectedImages().toString()}</div>
        <div style={{
            display: "block",
            minHeight: "1px",
            width: "100%",
            border: "1px solid #ddd",
            overflow: "auto"
        }}>
            <Gallery
                images={images}
                onSelectImage={onSelectImage}
                showLightboxThumbnails={true}/>
        </div>
        <Modal
            title="Title"
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            destroyOnClose={true}
        >
            <Form
                layout="vertical"
                initialValues={{}}
                form={form}
                preserve={false}
            >
                <Form.Item label="Tên sự cố" name='name' rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Mô tả" name='description' rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}>
                    <Input.TextArea rows={5} />
                </Form.Item>
                <Form.Item label="Mức độ" name='level' rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}>
                    <Select>
                        {levels.map(item => <Select.Option value={item.code} key={item.code}>{item.name}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item label="DatePicker" name='dueDate' rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}>
                    <DatePicker />
                </Form.Item>
                <Form.Item label="Vị trí" name='location' rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    </div>
}

export default ImageGalley;
