import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  RESTORE_TOKEN_REQUEST,
  RESTORE_TOKEN_SUCCESS,
  RESTORE_TOKEN_FAILURE,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS
} from '../actions/constants';

const userState = {
  email: null,
  token: null,
  role: null,
  profileId: null,
  photo: null,
  username: null,
  id: null
};

const defaultState = {
  data: userState,
  loading: false,
  authLoading: false,
  error: null
};

export function auth(state = defaultState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        data: userState,
        authLoading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        data: action.data,
        authLoading: false,
        error: null
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        authLoading: false,
        error: action.error
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...defaultState
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        error: action.error
      };
    case RESTORE_TOKEN_REQUEST:
      return {
        ...state,
        loading: true,
        data: null
      };
    case RESTORE_TOKEN_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
        error: null
      };
    case RESTORE_TOKEN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case REGISTER_REQUEST:
      return {
        ...state,
        data: userState,
        authLoading: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: null,
        authLoading: false
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        error: action.error,
        authLoading: false
      };

    default:
      return state;
  }
}
