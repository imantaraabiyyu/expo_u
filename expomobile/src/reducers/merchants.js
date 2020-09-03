import {
  SAVE_MERCHANT_REQUEST,
  SAVE_MERCHANT_SUCCESS,
  SAVE_MERCHANT_FAILURE,
  FIND_MERCHANT_REQUEST,
  FIND_MERCHANT_SUCCESS,
  FIND_MERCHANT_FAILURE,
  FIND_MERCHANTS_REQUEST,
  FIND_MERCHANTS_SUCCESS,
  FIND_MERCHANTS_FAILURE
} from '../actions/constants';

const defaultState = { data: null, loading: false, error: null };

export function savedMerchant(state = defaultState, action) {
  switch (action.type) {
    case SAVE_MERCHANT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SAVE_MERCHANT_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case SAVE_MERCHANT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function merchantById(state = defaultState, action) {
  switch (action.type) {
    case FIND_MERCHANT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FIND_MERCHANT_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case FIND_MERCHANT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function merchants(state = defaultState, action) {
  switch (action.type) {
    case FIND_MERCHANTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FIND_MERCHANTS_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case FIND_MERCHANTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
