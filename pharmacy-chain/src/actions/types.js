export const ROOT_URL = 'http://10.8.47.4:17173';

export const AUTH_USER = 'auth_user';                                 //登录
export const UNAUTH_USER = 'unauth_user';                             //退出登录
export const AUTH_ERROR = 'auth_error';                               //登录失败

export const REQUEST_SUCCESS = 'request_success';                     //http请求正确
export const REQUEST_ERROR = 'request_error';                         //http请求返回错误

export const FETCH_ALLIANCE_LIST = 'fetch_alliance_list';             //获取联盟成员列表

export const FETCH_STAT_DATA = 'fetch_stat_data';                     //获取链上统计数据



export function requestError(error) {
  return {
    type: REQUEST_ERROR,
    payload: error
  };
}