import * as icons from '@ant-design/icons'
import _ from 'lodash'


function getAllIcons() {
    const allIcons = []
    _.mapValues(icons, (value, key) => {
        if (typeof value === 'object' && key !== 'default' && key !== 'IconProvider') {
            allIcons.push({ name: key, renderFn: value })
        }
    })
    return allIcons
}

export default getAllIcons()