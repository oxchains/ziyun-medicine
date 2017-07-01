/**
 * Created by finch on 6/28/17.
 */
import {
  SIGNUP_STEP0,
  SIGNUP_STEP1,
  SIGNUP_STEP2,
  PAGE_INDEX,
  GET_CODE,
  CHECK_CODE,
  DOWNLOAD_FILE,
  SIGN_TYPE
} from '../actions/types';

export default function (state = {index: 0}, action) {
  switch (action.type) {
    case PAGE_INDEX: {
      return {
        ...state, index: action.payload
      }
    }
    case GET_CODE: {
      return {
        ...state, codeUrl: action.payload
      }
    }
    case SIGN_TYPE: {
      return {
        ...state, types: action.payload
      }
    }
    default: {
      return state;
    }
  }
}