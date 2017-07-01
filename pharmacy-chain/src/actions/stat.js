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
    /*axios.get(`${ROOT_URL}/stat`, { headers: getAuthorizedHeader() })
      .then(response => {
        dispatch({ type: FETCH_STAT_DATA, payload:response });
        callback();
      })
      .catch( err => callback(err.message) );*/
    axios.get(`${ROOT_URL}/stat?start=${startDate}&end=${endDate}`, { headers: getAuthorizedHeader() })
      .then(response => {
        dispatch({ type: FETCH_STAT_DATA, payload:response });
        callback();
      })
      .catch( err => {
        //TODO: fake data
        dispatch({type: FETCH_STAT_DATA, payload: { data:{ data: { "shipping": "3540", "stock_in": "3624", "stock_out": "2875" } } }});
        callback();
      } );
  }
}