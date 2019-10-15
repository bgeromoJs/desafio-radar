import { FORM } from '../actions/actionTypes';

const initialState = {
  formState: 'create'
};

export function formType(state = initialState, action) {
  switch(action.type) {
    case FORM:
      return {...state, formState: action.payload};
    default:
      return state;
  }
}