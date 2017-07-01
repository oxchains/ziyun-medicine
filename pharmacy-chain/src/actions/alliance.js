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
  FETCH_ALLIANCE_LIST,
  requestError
} from './types';

/**
 * 联盟成员列表
 */
export function fetchAllianceList() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/user`)
      .then(response => dispatch({ type: FETCH_ALLIANCE_LIST, payload:response }))
      .catch( err => dispatch(requestError(err.message)) );
  }
}