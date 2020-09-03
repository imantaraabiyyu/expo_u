import {
  USER_CREDIT_REQUEST,
  USER_CREDIT_SUCCESS,
  USER_CREDIT_FAILURE,
  USER_HISTORY_CREDIT_REQUEST,
  USER_HISTORY_CREDIT_FAILURE,
  USER_HISTORY_CREDIT_SUCCESS
} from '../actions/constants';

const defaultState = { data: null, loading: false, error: null };

export function userCredit(state = defaultState, action) {
  switch (action.type) {
    case USER_CREDIT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case USER_CREDIT_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case USER_CREDIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case USER_HISTORY_CREDIT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case USER_HISTORY_CREDIT_FAILURE:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case USER_HISTORY_CREDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
