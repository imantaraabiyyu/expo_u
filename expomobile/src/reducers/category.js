import {
  FIND_CATEGORY_REQUEST,
  FIND_CATEGORY_SUCCESS,
  FIND_CATEGORY_FAILURE
} from '../actions/constants';

const defaultState = { data: null, loading: false, error: null };

export function findCategories(state = defaultState, action) {
  switch (action.type) {
    case FIND_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FIND_CATEGORY_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case FIND_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
