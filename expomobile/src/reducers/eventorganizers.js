import {
  SAVE_EO_REQUEST,
  SAVE_EO_SUCCESS,
  SAVE_EO_FAILURE,
  FIND_EO_REQUEST,
  FIND_EO_SUCCESS,
  FIND_EO_FAILURE,
  FIND_EOS_REQUEST,
  FIND_EOS_SUCCESS,
  FIND_EOS_FAILURE
} from '../actions/constants';

const defaultState = { data: null, loading: false, error: null };

export function savedEO(state = defaultState, action) {
  switch (action.type) {
    case SAVE_EO_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SAVE_EO_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case SAVE_EO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function EOById(state = defaultState, action) {
  switch (action.type) {
    case FIND_EO_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FIND_EO_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case FIND_EO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function EOs(state = defaultState, action) {
  switch (action.type) {
    case FIND_EOS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FIND_EOS_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case FIND_EOS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
