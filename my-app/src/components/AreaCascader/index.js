import React from "react";
import { Cascader } from "antd";

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            options: []
        }
    }
    componentDidMount() {
        global.service.get('/api/area/province').then(({ records = [] }) => {
            records.map(item => item.isLeaf = false)
            this.setState({
                options: records
            })
        })
    }
    // 动态加载市和区
    onRequestCityOrRegion = (parent) => {
        const isLeaf = String(parent.id).length === 2 ? true : false
        global.service.get(`/api/area/${isLeaf ? 'region' : 'city'}`,{pid:parent.id}).then(data => {
            data.records.map(item => item.isLeaf = isLeaf)
            parent.children = data.records
            this.setState({
                options: [...this.state.options]
            })
        })
    }
    loadData = (selectedOptions = []) => {
        const selectedOption= selectedOptions[selectedOptions.length-1]
        this.onRequestCityOrRegion(selectedOption)
    }
    render() {
        return (
            <Cascader placeholder='省/市/区'
                options={this.state.options}
                loadData={this.loadData}
                onChange={this.props.onChange}
            />
        )
    }
}