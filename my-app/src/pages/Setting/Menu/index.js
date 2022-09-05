import React from "react";
import { Button, Card, Table, Space, Modal, message } from 'antd'
import { GlobalOutlined, PlusOutlined } from '@ant-design/icons'
import { Panel } from "../../../components"
import { connect } from "react-redux"
import ModalForm from "./ModalForm";

class Menu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: []
        }
    }
    // 列表请求
    onGetList = () => {
        global.service.get('/api/menu/list').then(data => {
            console.log(data);
            this.setState({ dataSource: data.records })
        })
    }
    componentDidMount() {
        this.onGetList()
    }

    onAdd = (record) => {
        return () => {
            // 打开弹窗
            this.props.dispatch({
                type: 'showModelForm',
                data: {
                    title: '新增', //弹窗标题
                    data: record ? { pid: record.id } : {}, //表单数据
                    refreshList: this.onGetList
                }
            })
        }
    }
    onView = (record) => {
        return () => {
            // 打开弹窗
            this.props.dispatch({
                type: 'showModelForm',
                data: {
                    title: '详情', //弹窗标题
                    data: record, //表单数据
                }
            })
        }
    }
    onEdit = (record) => {
        return () => {
            // 打开弹窗
            this.props.dispatch({
                type: 'showModelForm',
                data: {
                    title: '编辑', //弹窗标题
                    data: record, //表单数据
                    refreshList: this.onGetList
                }
            })
        }
    }
    onRemove = (record) => {
        return () => {
            Modal.confirm({
                title: '删除',
                content: '确认要删除吗？',
                onOk: () => {
                    global.service.post('/api/menu/delete', { id: record.id }).then(data => {
                        message.success('操作成功')
                        this.onGetList()
                        window.dispatchEvent(new Event('refreshMenus'))
                    })
                }
            })
        }
    }

    getTableProps = () => {
        return {
            columns: [
                {
                    title: "菜单",
                    dataIndex: 'name'
                },
                {
                    title: "访问地址",
                    dataIndex: "linkUrl"
                },
                {
                    title: "操作",
                    render: (record) => {
                        return (
                            <Space>
                                <a onClick={this.onView(record)}>查看</a>
                                <a onClick={this.onEdit(record)}>编辑</a>
                                <a onClick={this.onRemove(record)}>删除</a>
                                <a onClick={this.onAdd(record)}>新增</a>
                            </Space>
                        )
                    }
                }
            ],
            dataSource: this.state.dataSource || [],
            rowKey: "id",
            pagination: false
        }
    }
    render() {
        const { modalForm } = this.props.menuState;
        // 这个内容没有显示是么
        // 是的

        return (
            <div>
                <Panel title="菜单管理">
                    <div className="m-operate">
                        <Button type="primary" icon={<PlusOutlined />} onClick={this.onAdd()}>新增</Button>
                    </div>
                    <Card>
                        {/* 列表组件 */}
                        <Table {...this.getTableProps()} />
                    </Card>
                    {modalForm && <ModalForm {...modalForm}{...this.props} />}
                </Panel>
            </div >
        )
    }
}

const mapStateToProps = (store) => ({ menuState: store.menu })
const mapDispatchToProps = (dispatch) => ({ dispatch })

export default connect(mapStateToProps, mapDispatchToProps)(Menu)