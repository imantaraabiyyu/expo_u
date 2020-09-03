import {
  SAVE_EVENT_REQUEST,
  SAVE_EVENT_SUCCESS,
  SAVE_EVENT_FAILURE,
  FIND_EVENT_REQUEST,
  FIND_EVENT_SUCCESS,
  FIND_EVENT_FAILURE,
  FIND_EVENTS_REQUEST,
  FIND_EVENTS_SUCCESS,
  FIND_EVENTS_FAILURE,
  FIND_STATUS_EVENTS_REQUEST,
  FIND_STATUS_EVENTS_SUCCESS,
  FIND_STATUS_EVENTS_FAILURE,
  EVENTS_STATUS_ONSCHEDULE_REQUEST,
  EVENTS_STATUS_ONSCHEDULE_SUCCESS,
  EVENTS_STATUS_ONSCHEDULE_FAILURE,
  EVENTS_STATUS_ONPROGRESS_REQUEST,
  EVENTS_STATUS_ONPROGRESS_SUCCESS,
  EVENTS_STATUS_ONPROGRESS_FAILURE,
  EVENTS_STATUS_DONE_REQUEST,
  EVENTS_STATUS_DONE_SUCCESS,
  EVENTS_STATUS_DONE_FAILURE,
  FIND_EVENT_MERCHANTS_REQUEST,
  FIND_EVENT_MERCHANTS_SUCCESS,
  FIND_EVENT_MERCHANTS_FAILURE
} from '../actions/constants';

const defaultState = { data: null, loading: false, error: null };

export function eventMerchants(state = defaultState, action) {
  switch (action.type) {
    case FIND_EVENT_MERCHANTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FIND_EVENT_MERCHANTS_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case FIND_EVENT_MERCHANTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function savedEvent(state = defaultState, action) {
  switch (action.type) {
    case SAVE_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SAVE_EVENT_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case SAVE_EVENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function eventById(state = defaultState, action) {
  switch (action.type) {
    case FIND_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FIND_EVENT_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case FIND_EVENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function events(state = defaultState, action) {
  switch (action.type) {
    case FIND_EVENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FIND_EVENTS_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case FIND_EVENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
export function eventsStatus(state = defaultState, action) {
  switch (action.type) {
    case FIND_STATUS_EVENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FIND_STATUS_EVENTS_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case FIND_STATUS_EVENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
export function eventsStatusOnSchedule(state = defaultState, action) {
  switch (action.type) {
    case EVENTS_STATUS_ONSCHEDULE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case EVENTS_STATUS_ONSCHEDULE_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case EVENTS_STATUS_ONSCHEDULE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
export function eventsStatusOnProgress(state = defaultState, action) {
  switch (action.type) {
    case EVENTS_STATUS_ONPROGRESS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case EVENTS_STATUS_ONPROGRESS_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case EVENTS_STATUS_ONPROGRESS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
export function eventsStatusDone(state = defaultState, action) {
  switch (action.type) {
    case EVENTS_STATUS_DONE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case EVENTS_STATUS_DONE_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case EVENTS_STATUS_DONE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
