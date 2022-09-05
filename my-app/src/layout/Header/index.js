import React from "react";
import { Space } from "antd";
import "./style.css"

class Header extends React.Component {
    render() {
        return (
            <div className="m-header">
                <Space>
                    <span>Hi,XXX</span>
                    <a href="/#/">退出登录</a>
                </Space>
            </div>
        )
    }
}
export default Header