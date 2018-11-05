import checkType from 'UTIL/type'

// 替换属性名
const replaceArrLabel = (arr, oldLab, newLab) => {
    if (!arr) {
        console.error('replaceArrLabel()：数据不存在')
        return
    }
    if (!checkType.isArr(arr)) {
        console.error('replaceArrLabel()：数据格式有误')
        return
    }
    const arrLen = arr.length
    for (let i = 0; i < arrLen; i++) {
        arr[i][newLab] = arr[i][oldLab]
        if (arr[i].children) {
            replaceArrLabel(arr[i].children, oldLab, newLab)
        }
    }
    // arr.forEach(item => {
    //     item[newLab] = item[oldLab]
    //     if (item.children) {
    //         replaceArrLabel(item.children, oldLab, newLab)
    //     }
    // })
    return arr
}
export {
    replaceArrLabel
}
