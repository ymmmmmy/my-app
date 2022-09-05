import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import routes from './routes';
import rootReducers from './reducers'
import { ConfigProvider, message } from 'antd';
import zhCn from 'antd/lib/locale/zh_CN'

import './index.css'
import service from './service';

global.service = service


const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)))

window.addEventListener('unhandledrejection', e => {
    const { response = {},reason={} } = e
    message.error(response.data || reason.message)
})


ReactDOM.render(
    <ConfigProvider locale={zhCn}>
        <Provider store={store}>
            {routes}
        </Provider>
    </ConfigProvider>,
    document.getElementById('root')
);

