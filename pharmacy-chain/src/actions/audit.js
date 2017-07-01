/**
 * Created by finch on 6/30/17.
 */
import axios from 'axios';

import {
  ROOT_URL,
  DOWNLOAD_USER_FILE,
  AUDIT,
  AUDIT_DETAIL,
  AUDITLISTS,
  FETCH_NOT_ALLIANCE_LIST,
  getAuthorizedHeader
} from './types';
/**
 * 是否审核通过
 * @param username
 * @param status
 * @param callback
 * @returns {Function}
 */
export function audit({uid, action}, callback) {
  return function (dispatch) {
    let remark = "";
    axios({
      url: `${ROOT_URL}/user/${uid}/authentication`,
      method: 'PUT',
      data: {action, remark},
      headers: getAuthorizedHeader()
    }).then((res => {
      if (res.status === 1) {
        callback({isSuccess: true});
      } else {
        callback({isSuccess: true});
      }
    }))
  }
}
/**
 * 获取联盟成员列表
 * @param authenticated 审计是否通过
 * @returns {Function}
 */
export function fetchAuditList({authenticated}) {
  return function (dispatch) {
    if (authenticated) {

    } else {
      axios.get(`${ROOT_URL}/user`, {params: {authenticated}, headers: getAuthorizedHeader()}).then((res) => {
        if (res.data.status == 1) {
          dispatch({
            type: FETCH_NOT_ALLIANCE_LIST,
            payload: res.data.data
          })
        }
      })
    }
  }
}
/**
 * 获取联盟成员详细信息
 * @param uid
 * @returns {Function}
 */
export function fetchDetailAudit({uid}, callback) {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/user/${uid}`, {headers: getAuthorizedHeader()}).then((res) => {
      if (res.data.status == 1) {
        dispatch({
          type: AUDIT_DETAIL,
          payload: res.data.data
        })

        callback();
      }
    })
  }
}

export function fetchImg({img1, img2, img3}, callback) {
  return function (dispatch) {
    let req1 = axios.get(`${ROOT_URL}${img1}`, {headers: getAuthorizedHeader(), responseType: 'arraybuffer'})
    let req2 = axios.get(`${ROOT_URL}${img2}`, {headers: getAuthorizedHeader(), responseType: 'arraybuffer'})
    let req3 = axios.get(`${ROOT_URL}${img3}`, {headers: getAuthorizedHeader(), responseType: 'arraybuffer'})

    axios.all([req1, req2, req3]).then(axios.spread((res1, res2, res3) => {
      callback({res1, res2, res3});
    }))
  }
}