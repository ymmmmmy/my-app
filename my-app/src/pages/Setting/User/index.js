import React from "react";
import { Panel } from "../../../components";
import { Card, Form, Table, Input, Button, Space, Avatar } from 'antd'
import { PlusOutlined } from "@ant-design/icons";
import { connect } from 'react-redux'
import ModalForm from "./ModalForm";

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        }
    }
    componentDidMount() {
        this.onGetList()
    }
    onGetList = (params={}) => {
        global.service.get('/api/user/list',params).then(data => {
            this.setState({
                dataSource: data.records
            })
        })
    }
    onSearch = (values) => {
        console.log(values);
        this.onGetList(values)
    }
    onAdd = () => {
        this.props.dispatch({
            type: 'showModelForm',
            data: {
                title: '新增',
                data: {}
            }
        })
    }
    getTableProps = () => ({
        columns: [
            {
                title: '用户名',
                dataIndex: 'name',
                render: (text, record) => {
                    return (
                        <Space>
                            <Avatar src={record.picture}/>
                            {text}
                        </Space>
                    )
                }
            },
            {
                title: '账号',
                dataIndex: 'account',
            },
            {
                title: '联系方式',
                dataIndex: 'tel',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
            },
            {
                title: '操作',
                render: (record) => {
                    return (
                        <Space>
                            <a>查看</a>
                            <a>编辑</a>
                            <a>删除</a>
                            <a>关联菜单</a>
                        </Space>
                    )
                }
            },
        ],
        dataSource: this.state.dataSource
    })

    render() {
        const { modalForm } = this.props.userState
        return (
            <Panel title='用户管理'>
                <Card className="m-filter">
                    <Form layout="inline" onFinish={this.onSearch}>
                        <Form.Item label='用户名' name='name'>
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' htmlType='submit'>搜索</Button>
                        </Form.Item>
                    </Form>
                </Card>
                <Card>
                    <div className="m-operate">
                        <Button type='primary' icon={<PlusOutlined />} onClick={this.onAdd}>新增</Button>
                    </div>
                    <Table {...this.getTableProps()} />
                </Card>
                {modalForm && <ModalForm {...modalForm} {...this.props} />}
            </Panel>
        )
    }
}

const mapStateToProps = (store) => ({ userState: store.user })
const mapDispatchToProps = (dispatch) => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(User)