export const ROOT_URL = 'http://10.8.47.4:17173';

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

export const PAGE_INDEX = 'page_index';
export const DECREASE_PAGE = 'decrease_page';

export const REQUEST_SUCCESS = 'request_success';                     //http请求正确
export const REQUEST_ERROR = 'request_error';                         //http请求返回错误

export const FETCH_ALLIANCE_LIST = 'fetch_alliance_list';             //获取联盟成员列表


export function requestError(error) {
  return {
    type: REQUEST_ERROR,
    payload: error
  };
}