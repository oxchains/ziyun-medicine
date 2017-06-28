import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import authReducer from './auth_reducer';
import allianceReducer from './alliance_reducer';
import statReducer from './stat_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  alliance: allianceReducer,
  stat: statReducer
});

export default rootReducer;
