import { formType } from './form';
import { userUpdate } from './user';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  form: formType,
  userId: userUpdate
});