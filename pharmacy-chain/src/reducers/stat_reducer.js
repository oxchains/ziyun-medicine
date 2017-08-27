/**
 * oxchain
 *
 *
 * Author: Jun
 * Date: 28/06/2017
 *
 */

import {
  REQUEST_SUCCESS,
  REQUEST_ERROR,
  FETCH_STAT_DATA
} from '../actions/types';

const INITIAL_STATE = { data: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_STAT_DATA:
      return { ...state, data:action.payload.data.data };
  }
  return state;
}