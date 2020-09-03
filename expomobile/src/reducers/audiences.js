import {
  SAVE_AUDIENCE_REQUEST,
  SAVE_AUDIENCE_SUCCESS,
  SAVE_AUDIENCE_FAILURE,
  FIND_AUDIENCE_REQUEST,
  FIND_AUDIENCE_SUCCESS,
  FIND_AUDIENCE_FAILURE,
  FIND_AUDIENCES_REQUEST,
  FIND_AUDIENCES_SUCCESS,
  FIND_AUDIENCES_FAILURE
} from '../actions/constants';

const defaultState = { data: null, loading: false, error: null };

export function savedAudience(state = defaultState, action) {
  switch (action.type) {
    case SAVE_AUDIENCE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SAVE_AUDIENCE_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case SAVE_AUDIENCE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function audienceById(state = defaultState, action) {
  switch (action.type) {
    case FIND_AUDIENCE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FIND_AUDIENCE_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case FIND_AUDIENCE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function audiences(state = defaultState, action) {
  switch (action.type) {
    case FIND_AUDIENCES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FIND_AUDIENCES_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case FIND_AUDIENCES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
