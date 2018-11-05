const gettype = Object.prototype.toString
const checkType = {
    isObj (o) {
        return gettype.call(o) === '[object Object]'
    },
    isArr (o) {
        return gettype.call(o) === '[object Array]'
    },
    isStr (o) {
        return gettype.call(o) === '[object String]'
    },
    isNum (o) {
        return gettype.call(o) === '[object Number]'
    },
    isBool (o) {
        return gettype.call(o) === '[object Boolean]'
    },
    isNULL (o) {
        return gettype.call(o) === '[object Null]'
    },
    isUndefined (o) {
        return gettype.call(o) === '[object Undefined]'
    },
    isFunc (o) {
        return gettype.call(o) === '[object Function]'
    },
    isDoc (o) {
        return gettype.call(o) === '[object Document]' || '[object HTMLDocument]'
    }
}
export default checkType
