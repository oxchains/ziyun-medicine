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
  FETCH_ALLIANCE_LIST
} from '../actions/types';

const INITIAL_STATE = { all: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_ALLIANCE_LIST:
      return { ...state, all:action.payload.data.data };
  }

  return state;
}