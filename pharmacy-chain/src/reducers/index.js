import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import authReducer from './auth_reducer';
import allianceReducer from './alliance_reducer';
import signReducer from './signup_reducer';
import statReducer from './stat_reducer';
import queryReducer from './query_reducer';
import peerReducer from './peer_reduicer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  alliance: allianceReducer,
  peer: peerReducer,
  stat: statReducer,
  query: queryReducer,
  sign: signReducer
});

export default rootReducer;
