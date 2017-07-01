/**
 * Created by finch on 6/29/17.
 */
import {SIGNUP_STEP0, SIGNUP_STEP1, SIGNUP_STEP2, PAGE_INDEX, ROOT_URL, SIGN_TYPE} from './types';
import axios from 'axios';

export function signActionCreator({type, payload}) {
  switch (type) {
    case SIGNUP_STEP0: {
      return {
        type: SIGNUP_STEP0,
        payload
      }
    }
    case SIGNUP_STEP1: {
      return {
        type: SIGNUP_STEP1,
        payload
      }
    }
    case SIGNUP_STEP2: {
      return {
        type: SIGNUP_STEP2,
        payload
      }
    }
    case PAGE_INDEX: {
      return {
        type: PAGE_INDEX,
        payload
      }
    }
  }
}
/**
 * 注册方法
 * @param params
 * @param callback
 * @returns {Function}
 */
export function signUp({registertype, email, username, password, phone, company, person, applyOFile, logoOFile, licenseOFile, idFrontOFile, idBackOFile, vcode}, callback) {
  return function (dispatch) {
    let formData = new FormData();

    formData.append("type", registertype);
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("company", company);
    formData.append("representative", person);
    formData.append("application", applyOFile);
    formData.append("logo", logoOFile);
    formData.append("license", licenseOFile);
    formData.append("idfront", idFrontOFile);
    formData.append("idback", idBackOFile);
    formData.append("vcode", vcode);
    formData.append("session", "session");
    axios({
      method: 'post',
      url: `${ROOT_URL}/user`,
      data: formData,
      headers: {'content-type': 'multipart/form-data'},
      withCredentials: true
    }).then((response) => {
      if (response.data.status == 1) {
        console.log(`upload success message: ${response.message}`);
        callback({
          status: 1,
          message: ''
        });
      } else {
        console.log("upload fail");
        callback({
          status: 0,
          message: response.data.message
        });
      }
    }).catch(err => {
      callback(err.message);
    })
  }
}
/**
 * 获取验证码
 * @returns {Function}
 */
export function getCode() {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/vcode`).then((response) => {
      if (response.status == 1) {
        dispatch();
      }
    });
  }
}
/**
 * 校验验证码
 * @returns {Function}
 */
export function checkCode() {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/code/checkCode`).then((response) => {
      if (response.status == 1) {
        dispatch();

      }
    })
  }
}
/**
 * 获取入盟申请书
 * @returns {Function}
 */
export function downloadFile() {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/user/download`).then((response) => {
      if (response.status == 1) {
        dispatch()

      }
    })
  }
}
/**
 * 获取注册类型
 * @returns {Function}
 */
export function getTypeList() {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/user/type`).then((res) => {
      if (res.data.status == 1) {
        dispatch({
          type: SIGN_TYPE,
          payload: res.data.data
        })
      }
    })
  }
}
