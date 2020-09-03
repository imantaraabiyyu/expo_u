import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  RESTORE_TOKEN_REQUEST
} from './constants';

export function login(data) {
  return {
    type: LOGIN_REQUEST,
    data: data
  };
}

export function logout() {
  return {
    type: LOGOUT_REQUEST
  };
}

export function restoreToken() {
  return {
    type: RESTORE_TOKEN_REQUEST
  };
}
