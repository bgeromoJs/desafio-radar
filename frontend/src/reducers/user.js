import { USER } from '../actions/actionTypes';

const initialState = {
  userId: ''
};

export function userUpdate(state = initialState, action) {
  switch(action.type) {
    case USER:
      return {...state, userId: action.payload};
    default:
      return state;
  }
}