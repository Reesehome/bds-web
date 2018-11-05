// 申请单类型
export const SERVICE_TYPE_INSTALL = 'IS' // 安装
export const SERVICE_TYPE_REPAIR = 'RP' // 维修
export const SERVICE_TYPE_MAINTENANCE = 'UK' // 保养
// 申请单状态
export const APPLICATION_STAT_TO_ACCEPT = 'ACCEPT' // 待受理
export const APPLICATION_STAT_TO_MASTER = 'WAIT_DISPACH' // 待派师傅
export const APPLICATION_STAT_TO_VISIT = 'WAIT_ONSITE' // 待上门
export const APPLICATION_STAT_TO_COMMENT = 'WAIT_COMMENT' // 待评价
export const APPLICATION_STAT_COMPLETED = 'COMPLETED' // 已完成
export const APPLICATION_STAT_CANCELLED = 'CANCEL' // 已取消
// 服务单状态
export const ORDER_STAT_NOT_ACTIVITE = 'not_activate' // 预派单待激活
export const ORDER_STAT_CHANGE_ACTIVATE = 'change_activate' // 改期待激活
export const ORDER_STAT_TO_OUTLETS = 'to_outlets' // 待派网点
export const ORDER_STAT_TO_MASTER = 'to_master' // 待派师傅
export const ORDER_STAT_TO_MASTER_ORDER = 'to_master_order' // 待接单
export const ORDER_STAT_TO_RESERVE = 'to_reserve' // 待精确预约
export const ORDER_STAT_WAIT_REPLY = 'wait_reply' // 待回单
export const ORDER_STAT_CANCEL_VISIT = 'cancel_wait_visit' // 取消待回访
export const ORDER_STAT_CANCELLED = 'cancelled' // 已取消
export const ORDER_STAT_FINISH_WAIT = 'finish_wait' // 待完工
export const ORDER_STAT_FINISH = 'finish' // 完成工单
export const ORDER_STAT_COMPLETE_VISITED = 'complete_visited' // 已完工已回访
export const ORDER_STAT_COMPLETE_WAIT_VISITED = 'complete_wait_visit' // 已完工待回访
export const ORDER_STAT_UNDONE_VISTISTED = 'undone_visited' // 未完工已回访
export const ORDER_STAT_COMPLETE_WAIT_COMMENT = 'complete_wait_comment' // 已完工待评价
export const ORDER_STAT_COMPLETE_COMMENTED = 'complete_commented' // 已完工已评价
export const ORDER_STAT_WAIT_VISIT = 'complete_wait_visit'
/** * complete_wait_visit:待回访* */
export const ORDER_STAT_CANCEL_CONFIRMED = 'cancel_confirmed' // 取消已确认
export const ORDER_STAT_CANCEL_VISITED = 'cancel_visited' // 取消已回访
export const ORDER_STAT_CANCEL_WAIT_CONFIRM = 'cancel_wait_confirm' // 取消待确认
// 绑定相关
export const BIND_ENTRANCE = 'index'// 从首页入口进入，在【绑定功能】和【查看已绑定产品】页面使用
