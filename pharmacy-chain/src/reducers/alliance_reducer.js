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
    FETCH_AUTHORIZE_COMPANY,
    UPDATE_AUTHORIZE_ERROR,
  AUDIT_DETAIL
} from '../actions/types';

const INITIAL_STATE = {all: null,authorize:null};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ALLIANCE_LIST:
      return {...state, all: action.payload.data.data};
    case FETCH_NOT_ALLIANCE_LIST: {
      return {...state, not_alliance_list: action.payload};
    }
      case UPDATE_AUTHORIZE_ERROR:
          return {...state, update_error: action.payload};
      case FETCH_AUTHORIZE_COMPANY:
          return {...state, authorize: action.payload};
    case AUDIT_DETAIL: {
      return {...state, auditDetail: action.payload};
    }
  }

  return state;
}