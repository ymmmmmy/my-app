import React from "react";
import { Space, Upload, message, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import _ from 'lodash'

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultFilist: this.props.defaultFilist || [{ uid: '1', url: 'XXX' }]
        }
        this.fileUrlList = []
    }
    render() {
        const uploadProps = {
            action: '/api/upload',
            listType: 'picture-card',
            maxCount: this.props.maxCount || 1,
            defaultFilist: this.state.defaultFilist,
            onChange: (info) => {
                const { file, fileList } = info;
                const { response } = file;
                if (file.status === 'done') {
                    // 保存所有文件的路径（包含默认已经存在的文件和刚上传的文件
                    this.fileUrlList = []
                    fileList.map(item => {
                        this.fileUrlList.push(item.url || item.response.file.url)
                    })
                    this.props.onChange && this.props.onChange(this.fileUrlList.join(','))
                } else if (file.status === 'error') {
                    message.error('上传失败！')
                }
            },
            onRemove: (file) => {
                _.remove(this.fileUrlList, (item) => (file.url || file.response.file.url) === item)
                this.props.onChange && this.props.onChange(this.fileUrlList.join(','))
            },
            onPreview: (file) => {
                this.setState({
                    preViewModal: { url: file.url || file.response.file.url }
                })
            }
        }
        return (
            <>
                <Upload {...uploadProps}>
                    <Space direction="vertical">
                        <PlusOutlined />
                        <div style={{ margin: 8 }}>上传</div>
                    </Space>
                </Upload>
                {this.state.preViewModal && <Modal title='预览'
                    onCancel={() => this.setState({ preViewModal: null })}
                    footer={null}
                    visible>
                    <img src={this.state.preViewModal.url} style={{ width: "100%"}} />
                </Modal>}
            </>
        )
    }
}