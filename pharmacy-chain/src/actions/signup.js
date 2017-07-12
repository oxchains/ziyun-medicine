/**
 * Created by finch on 6/29/17.
 */
import {SIGNUP_STEP0, SIGNUP_STEP1, SIGNUP_STEP2, PAGE_INDEX, ROOT_URL, SIGN_TYPE, getAuthorizedHeader} from './types';
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

/**
 *
 * 更新成员信息
 * @param logo
 * @param email
 * @param telephone
 * @returns {Function}
 */
export function updateInfoAction({logo, email, telephone}, callback) {
  return function (dispatch) {
    let formData = new FormData();
    formData.append('logo', logo);
    formData.append('email', email);
    formData.append('phone', telephone);
    axios({
      method: 'post',
      url: `${ROOT_URL}/user/info`,
      data: formData,
      headers: {'content-type': 'multipart/form-data'},
      withCredentials: true,
      headers: getAuthorizedHeader()
    }).then((res) => {
      if (res.data.status == 1) {
        callback({
          status: 1,
          message: ''
        });
      } else {
        callback({
          status: 0,
          message: res.data.message
        });
      }
    })
  }
}


/**
 * 更新成员密钥
 * @param currentPwd
 * @param newPwd
 */
export function userPwdAction({oldpwd, newpwd}, callback) {
  return function (dispatch) {
    axios({
        method: 'put',
        url: `${ROOT_URL}/user/secret`,
        data: {oldpass: oldpwd, newpass: newpwd},
        headers: getAuthorizedHeader()
      }
    ).then((res) => {
      if (res.data.status == 1) {
        callback({
          status: 1,
          message: ''
        })
      } else {
        callback({
          status: 0,
          message: res.data.message
        })
      }
    })
  }
}
/**
 * 重置密码
 * @param email
 * @param vcode
 * @param password
 * @returns {Function}
 */
export function resetPwdAction({email, vcode, password}, callback) {
  return function (dispatch) {
    axios({
      method: 'post',
      url: `${ROOT_URL}/user/secret/reset`,
      data: {email, vcode, password},
      headers: getAuthorizedHeader()
    }).then((res) => {
      if (res.data.status == 1) {
        callback({
          status: 1,
          message: ''
        })
      } else {
        callback({
          status: 0,
          message: res.data.message
        })
      }
    })
  }
}
/**
 * 获取重置验证码
 * @param email
 * @returns {Function}
 */
export function resetCodeAction(email, callback) {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/user/secret/reset/vcode`, {params: {email}}).then((res) => {
      if (res.data.status == 1) {
        callback();
      }
    })
  }
}
