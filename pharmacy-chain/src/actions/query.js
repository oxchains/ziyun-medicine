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
    return function(dispatch) {
          console.log(`${ROOT_URL}/productGmp/${InputChoice}`, { headers: getAuthorizedHeader() })
        axios.get(`${ROOT_URL}/productGmp/${InputChoice}`, { headers: getAuthorizedHeader() })
            .then(response => {
                console.log(response)
                callback();
            })
            .catch( err => callback(err.message) );
    }
}
