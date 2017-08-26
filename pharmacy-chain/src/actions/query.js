/**
 * oxchain
 *
 *
 * Author: Jun
 * Date: 30/06/2017
 *
 */

import axios from 'axios';
import {
  ROOT_URL,
  FETCH_SENSOR_DATA,
  requestError,
    getAuthorizedHeader
} from './types';

/**
 * 查询传感器数据结果
 */
export function fetchSensorData({ serial, type, startDate, endDate }, callback) {
  return function(dispatch) {

    axios.get(`${ROOT_URL}/contract/sensor?${type==='serial'?'serial':'equipment'}=${serial}&start=${startDate}&end=${endDate}`, { headers: getAuthorizedHeader() })
    //axios.get('http://localhost:3000/sensor')
      .then(response => {
          console.log(response  )
        dispatch({ type: FETCH_SENSOR_DATA, payload:response });
        callback(response);
      })
      .catch( err => callback(err.message) );
  }
}

/**
 * 查询产品首营资料结果
 */
export function fetchFirstCampProduct({ InputChoice }, callback) {
    return function() {

       console.log(callback)

        axios.get(`${ROOT_URL}/productGmp/${JSON.stringify(InputChoice)}`, { headers: getAuthorizedHeader() })
            .then(response => {
                console.log(response)
                callback();
            })
            .catch( err => callback(err.message) );
    }
}

/**
 * 查询企业首营资料结果
 */
export function fetchFirstCampEnterprise({ InputChoice ,radioChoice}, callback) {
    return function() {

        console.log('--------'+InputChoice)
        console.log('+++++++++'+ radioChoice)
        console.log(callback)
        axios.get(`${ROOT_URL}/enterpriseGmp/${InputChoice}/${radioChoice==='produce_enterprise'?'produce_enterprise':'circulation_enterprises'}`, { headers: getAuthorizedHeader() })
            .then(response => {
                console.log(response)
                console.log(callback)
                callback();
            })
            .catch( err => callback(err.message) );
    }
}
