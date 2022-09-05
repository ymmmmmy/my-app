import React from "react";
import { Modal, Form, Input, Select, Radio, Dropdown, Space, Pagination, message } from "antd";
import { icons } from "../../../components"
import _ from "lodash"

class ModalForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pName: '',
            isOfAdmin: '',
            icon: '',
            allIcons: icons,
            currentIcons: icons.slice(0, 10)
        }

    }

    formRef = React.createRef()

    onCancel = () => {
        // 关闭弹窗
        this.props.dispatch({
            type: 'hideModalForm'
        })
    }
    onSave = (values) => {
        console.log(values);
        if (this.props.title === "新增") {
            global.service.post('/api/menu/add', { ...values, pid: this.props.data.pid }).then((data) => {
                console.log(data);
                message.success('操作成功');
                this.onCancel();
                this.props.refreshList();
                // 通过监听事件的方式来实现页面的刷新
                window.dispatchEvent(new Event('refreshMenus'))
            })
            return
        }
        global.service.post('/api/menu/update', { ...values, pid: this.props.data.pid || undefined, id: this.props.data.id }).then((data) => {
            console.log(data);
            message.success('操作成功');
            this.onCancel();
            this.props.refreshList();
            // 通过监听事件的方式来实现页面的刷新
            window.dispatchEvent(new Event('refreshMenus'))
        })
    }

    onIconFilter = (e) => {
        // 获取输入框内容
        let { value } = e.target
        value = _.trim(value)
        const newIcons = []
        if (value) {
            // 对所有的图标进行遍历，判断图标的组件名称是否输入的关键字
            icons.map(item => {
                // 将组件名称和输入的字段全部转换成小写
                if (_.lowerCase(item.name).indexOf(_.lowerCase(value)) !== -1) {
                    newIcons.push(item)
                }
            })
            this.setState({
                icon: value,
                allIcons: newIcons,
                currentIcons: newIcons.slice(0, 10)
            })
            return
        }
        this.setState({
            icon: value,
            allIcons: icons,
            currentIcons: icons.slice(0, 10)
        })
    }

    onIconChange = (e) => {
        // 获取被选中的图标的值
        const { value } = e.target
        this.setState({ icon: value })
        // 手动将这个值设置给Form表单
        this.formRef.current.setFieldsValue({ icon: value })
    }

    componentDidMount() {
        // 设置Form表单的数据
        const { data = {} } = this.props
        this.formRef.current.setFieldsValue(data)
        console.log(data);
        this.setState({
            icon: data.icon,
        })
        // 根据PID获取父级菜单名称
        data.pid && data.pid !== -1 && global.service.get('/api/menu/getMenuName', { id: data.pid }).then(data => {
            this.setState({
                pName: data.record.name
            })
        })

    }

    layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 }
    }

    render() {
        const readonly = this.props.title == '详情' ? true : false;
        return <Modal visible width={600} title={this.props.title}
            onCancel={this.onCancel}
            onOk={() => this.formRef.current.submit()}
            className={readonly ? 'm-readyonly-modal' : ''}
        >
            <Form {...this.layout} ref={this.formRef} onFinish={this.onSave}>
                <Form.Item label='父菜单'>
                    {this.state.pName || '无'}
                </Form.Item>

                <Form.Item label="菜单名称" name='name' rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="访问路径" name='linkUrl' rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="打开方式" name='openType' rules={[{ required: true }]}>
                    <Select>
                        <Select.Option value='1'>当前窗口</Select.Option>
                        <Select.Option value='2'>新窗口</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="图标" name='icon' rules={[{ required: true }]}>
                    <Dropdown trigger={['click']}
                        overlayStyle={{ background: '#fff', padding: 10 }}
                        overlay={<>
                            <Radio.Group onChange={this.onIconChange}>
                                <Space direction="vertical">
                                    {
                                        this.state.currentIcons.map(item => {
                                            return <Radio value={item.name}>
                                                {React.createElement(item.renderFn)}
                                                <span style={{ margin: 5 }}>{item.name}</span>
                                            </Radio>
                                        })
                                    }
                                </Space>
                            </Radio.Group>

                            <div style={{ textAlign: 'right', padding: 10 }}>
                                <Pagination showSizeChanger={false}
                                    size='small' total={this.state.allIcons.length}
                                    onChange={(page, pageSize) => {
                                        this.setState({
                                            currentIcons: this.state.allIcons.slice(pageSize * (page - 1), pageSize * page)
                                        })
                                    }} />
                            </div>
                        </>}
                    >
                        <Input
                            prefix={React.createElement((_.find(this.state.allIcons, (item) => item.name == this.state.icon) || {}).renderFn || 'span')}
                            onChange={this.onIconFilter}
                            value={this.state.icon} />
                    </Dropdown>
                </Form.Item>

                <Form.Item label="权限" name='isOfAdmin' rules={[{ required: true }]}>
                    <Radio.Group onChange={this.onIsOfAdminChange}>
                        <Radio value='1'>仅超管可见</Radio>
                        <Radio value='2'>不限</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>
    }
}

export default ModalForm