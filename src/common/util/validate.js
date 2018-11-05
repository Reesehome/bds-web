export const isvalidUsername = (str) => {
    const validMap = ['admin', 'editor']
    return validMap.indexOf(str.trim()) >= 0
}

/* 合法uri */
export const isURL = (textval) => {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return urlregex.test(textval)
}

/* 小写字母 */
export const isLowerCase = (str) => {
    const reg = /^[a-z]+$/
    return reg.test(str)
}

/* 大写字母 */
export const isUpperCase = (str) => {
    const reg = /^[A-Z]+$/
    return reg.test(str)
}

/* 大小写字母 */
export const isAlphabets = (str) => {
    const reg = /^[A-Za-z]+$/
    return reg.test(str)
}

/* validate email */
export const isEmail = (email) => {
    const re = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    return re.test(email)
}
/* 手机号码 */
export const isPhone = (str) => {
    const reg = /^1\d{10}$/
    return reg.test(str)
}
/* 判断字符串是否为纯数字字符串 */
export const isNumber = (str) => {
    const reg = /^\d+$/g
    return reg.test(str)
}

/* 传真 */
export const isFax = (str) => {
    const reg = /^(\d{3,4}-)?\d{7,8}$/
    return reg.test(str)
}
/* ip */
export const isIP = (str) => {
    const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
    return reg.test(str)
}
