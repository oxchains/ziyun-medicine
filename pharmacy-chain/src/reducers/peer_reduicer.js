/**
 * oxchain
 *
 *
 * Author: Jun
 * Date: 30/06/2017
 *
 */

import {
  REQUEST_SUCCESS,
  REQUEST_ERROR,
  FETCH_PEER_INFO
} from '../actions/types';

const INITIAL_STATE = { info: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_PEER_INFO:
      return { ...state, info:action.payload.data.data };
  }

  return state;
}