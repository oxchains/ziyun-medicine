/**
 * Created by finch on 6/29/17.
 */
import {SIGNUP_STEP0, SIGNUP_STEP1, SIGNUP_STEP2, PAGE_INDEX, ROOT_URL} from './types';
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
export function signUp(params, callback) {
  return function (dispatch) {
    let formData = new FormData();

    formData.append("applyfile", params.applyOFile);
    formData.append("registertype", params.registertype);
    formData.append("email", params.email);
    formData.append("validatecode", params.validatecode);
    formData.append("username", params.username);
    formData.append("password", params.password);
    formData.append("repeatpassword", params.repeatpassword);
    formData.append("phone", params.phone);
    formData.append("logo", params.logo);
    formData.append("company", params.company);
    formData.append("license", params.license);
    formData.append("person", params.person);
    formData.append("identity", params.identity);

    axios.post(`${ROOT_URL}/user/apply`, {
      data: formData,
      headers: {'content-type': 'multipart/form-data'}
    }).then((response) => {
      if (response.status == 1) {
        console.log(`upload success message: ${response.message}`);
        callback();
      } else {
        console.log("upload fail");
        callback();
      }
    })
  }
}
/**
 * 获取验证码
 * @returns {Function}
 */
export function getCode() {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/code/getCode`).then((response) => {
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


  }

}
