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
  FETCH_SENSOR_DATA,
    FETCH_FIRST_PRODUCT,
    FETCH_FIRST_COMPANY
} from '../actions/types';

const INITIAL_STATE = { sensor: null ,product:null ,company:null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_SENSOR_DATA:
      return { ...state, sensor:action.payload.data.data };
      case FETCH_FIRST_PRODUCT:
        return { ...state, product:action.payload.data.data };
      case FETCH_FIRST_COMPANY:
        return { ...state, company:action.payload.data.data};
  }

  return state;
}