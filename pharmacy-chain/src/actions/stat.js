/**
 * oxchain
 *
 *
 * Author: Jun
 * Date: 28/06/2017
 *
 */

import axios from 'axios';
import {
  ROOT_URL,
  FETCH_STAT_DATA,
  requestError,
  getAuthorizedHeader
} from './types';

/**
 * 链上统计数据
 */
export function fetchStat({ startDate, endDate }, callback) {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/stat`, { headers: getAuthorizedHeader() })
    //axios.get('http://localhost:3000/stat')
      .then(response => {
        dispatch({ type: FETCH_STAT_DATA, payload:response });
        callback();
      })
      .catch( err => callback(err.message) );
  }
}