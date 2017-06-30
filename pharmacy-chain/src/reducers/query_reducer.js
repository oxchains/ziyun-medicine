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
  FETCH_SENSOR_DATA
} from '../actions/types';

const INITIAL_STATE = { sensor: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_SENSOR_DATA:
      return { ...state, sensor:action.payload.data.data };
  }

  return state;
}