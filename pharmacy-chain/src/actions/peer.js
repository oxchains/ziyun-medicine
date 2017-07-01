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
  FETCH_PEER_INFO,
  requestError,
  getAuthorizedHeader
} from './types';

export function fetchPeerInfo(callback) {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/peer`, { headers: getAuthorizedHeader() })
      .then(response => dispatch({ type: FETCH_PEER_INFO, payload:response }))
      .catch( err => {
        dispatch(requestError(err.message));
        if(typeof callback === 'function') callback(err.message);
      } );
  }
}