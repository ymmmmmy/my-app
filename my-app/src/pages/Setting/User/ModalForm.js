import { Modal, Form, Input, message } from "antd";
import React from "react";
import {AreaCascader, Upload} from '../../../components'

class ModalForm extends React.Component {
    formRef=React.createRef()
    layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 }
    }
    onSave=(values)=>{
        global.service.post('/api/user/add',{...values,area:values.area.join(',')}).then(data=>{
            message.success('操作成功！')
            this.onCancel()
            // 刷新列表
        })
    }
    onCancel=()=>{
        this.props.dispatch({
            type:'hideModalForm'
        })
    }
    onPictureChange=(value)=>{
        this.formRef.current.setFieldsValue({picture:value})
    }
    onAreaChange=(value)=>{
        this.formRef.current.setFieldsValue({area:value})
    }
    render() {
        return (
            <Modal visible width={600} title={this.props.title}
            onOk={()=>this.formRef.current.submit()} onCancel={this.onCancel}>
                <Form {...this.layout} onFinish={this.onSave} ref={this.formRef}>
                    <Form.Item label='用户名' name='name' rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label='账号' name='account' rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label='所在地区' name='area' rules={[{ required: true }]}>
                        <AreaCascader onChange={this.onAreaChange}/>
                    </Form.Item>
                    <Form.Item label='联系方式' name='tel' rules={[{ required: true }, { pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, message: '不是合格的手机号' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label='邮箱' name='email' rules={[{ required: true }, { type: "email" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label='上传头像' name='picture'>
                        <Upload onChange={this.onPictureChange}/>
                    </Form.Item>
                </Form>

            </Modal>
        )
    }
}

export default ModalForm