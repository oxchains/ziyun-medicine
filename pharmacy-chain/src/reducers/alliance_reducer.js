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
  FETCH_ALLIANCE_LIST,
  FETCH_NOT_ALLIANCE_LIST,
  AUDIT_DETAIL
} from '../actions/types';

const INITIAL_STATE = {all: null};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ALLIANCE_LIST:
      return {...state, all: action.payload.data.data};
    case FETCH_NOT_ALLIANCE_LIST: {
      return {...state, not_alliance_list: action.payload};
    }
    case AUDIT_DETAIL: {
      return {...state, auditDetail: action.payload};
    }
  }

  return state;
}