import { FORM, USER } from './actionTypes';

export const formState = form => ({
  type: FORM,
  payload: form
});

export const setUser = user => ({
  type: USER,
  payload: user
});