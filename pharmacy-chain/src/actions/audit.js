/**
 * Created by finch on 6/30/17.
 */
import axios from 'axios';

import {ROOT_URL, DOWNLOAD_USER_FILE, AUDIT, AUDIT_DETAIL, AUDITLISTS, FETCH_NOT_ALLIANCE_LIST} from './types';
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
    axios.put(`${ROOT_URL}/user/${uid}/authentication`, {action, remark}).then((res => {
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
      axios.get(`${ROOT_URL}/user`, {params: {authenticated}}).then((res) => {
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
export function fetchDetailAudit({uid}) {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/user/${uid}`).then((res) => {
      if (res.data.status == 1) {
        dispatch({
          type: AUDIT_DETAIL,
          payload: res.data.data
        })
      }
    })
  }
}