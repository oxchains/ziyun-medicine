import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import authReducer from './auth_reducer';
import allianceReducer from './alliance_reducer';
import signReducer from './signup_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  alliance: allianceReducer,
  sign:signReducer
});

export default rootReducer;
