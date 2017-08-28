export const ROOT_URL = 'http://api.member.oxchains.com:57600';


export const QQQROOT_URL = 'http://192.168.4.121:8080';

export const AUTH_USER = 'auth_user';                                 //登录
export const UNAUTH_USER = 'unauth_user';                             //退出登录
export const AUTH_ERROR = 'auth_error';                               //登录失败
export const SIGNUP_STEP0 = 'signup_step0';                           //获取注册第一页数据
export const SIGNUP_STEP1 = 'signup_step1';                           //获取注册第二页数据
export const SIGNUP_STEP2 = 'signup_step2';                           //获取注册第三页数据

export const SIGN_APPLY = 'sign_apply';                               //提交注册信息
export const GET_CODE = 'get_code';                                   //获取验证码
export const CHECK_CODE = 'check_code';                               //校验验证码
export const DOWNLOAD_FILE = 'download_file';                         //获取入盟申请表
export const SIGN_TYPE = 'apply_type';                                //注册类别

export const DOWNLOAD_USER_FILE = 'download_user_file';               //下载审核页面申请表
export const AUDIT = 'audit';                                         //用户审核
export const AUDITLISTS = 'auditlist';                                //查询审核列表
export const AUDIT_DETAIL = 'audit_detail';                           //查询审核详情

export const PAGE_INDEX = 'page_index';
export const DECREASE_PAGE = 'decrease_page';

export const REQUEST_SUCCESS = 'request_success';                     //http请求正确
export const REQUEST_ERROR = 'request_error';                         //http请求返回错误

export const FETCH_ALLIANCE_LIST = 'fetch_alliance_list';             //获取联盟成员列表
export const FETCH_PEER_INFO = 'fetch_peer_info';                     //获取节点详情
export const FETCH_NOT_ALLIANCE_LIST = 'fetch_not_alliance_list';     //获取联盟成员列表

export const FETCH_SENSOR_DATA = 'fetch_sensor_data';                 //获取追溯查证数据(传感器数据)

export const FETCH_STAT_DATA = 'fetch_stat_data';                     //获取链上统计数据
export const UPDATE_USER_INFO = 'update_user_info';                   //更新成员信息
export const UPDATE_USER_SECRET = 'update_user_secret';               //更新成员密钥
export const RESET_USER_SECRET = 'reset_user_secret';                 //重置密码
export const RESET_CODE = 'reset_code';                               //重置验证码

export const FETCH_FIRST_PRODUCT = 'fetch_first_product';            //产品首营资料

export const FETCH_FIRST_COMPANY = 'fetch_first_company';             //企业首营资料
export function getAuthorizedHeader() {
  return { authorization: 'Bearer '+localStorage.getItem('token') }
}

export function requestError(error) {
  return {
    type: REQUEST_ERROR,
    payload: error
  };
}