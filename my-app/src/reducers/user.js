const initState = {
    modalForm: null //控制弹窗的是否显示
}

const menu = (state = initState, action) => {
    const { type, data } = action;
    switch (type) {
        case 'showModelForm':
            return { ...state, modalForm: data }
        case 'hideModalForm':
            return { ...state, modalForm: null }
        default:
            return initState
    }
}
export default menu