import {
  SAVE_EVENT_REQUEST,
  FIND_EVENT_REQUEST,
  FIND_EVENTS_REQUEST,
  FIND_STATUS_EVENTS_REQUEST,
  EVENTS_STATUS_ONSCHEDULE_REQUEST,
  EVENTS_STATUS_ONPROGRESS_REQUEST,
  EVENTS_STATUS_DONE_REQUEST,
  FIND_EVENT_MERCHANTS_REQUEST
} from './constants';

export function save(data) {
  return {
    type: SAVE_EVENT_REQUEST,
    data: data
  };
}

export function findById(id) {
  return {
    type: FIND_EVENT_REQUEST,
    id: id
  };
}

export function findAll(params) {
  return {
    type: FIND_EVENTS_REQUEST,
    params: params
  };
}

export function findMerchants(params) {
  return {
    type: FIND_EVENT_MERCHANTS_REQUEST,
    params: params
  };
}

export function findByStatus(params) {
  return {
    type: FIND_STATUS_EVENTS_REQUEST,
    params: params
  };
}

export function findByStatusOnSchedule(params) {
  return {
    type: EVENTS_STATUS_ONSCHEDULE_REQUEST,
    params: params
  };
}
export function findByStatusOnProgress(params) {
  return {
    type: EVENTS_STATUS_ONPROGRESS_REQUEST,
    params: params
  };
}
export function findByStatusDone(params) {
  return {
    type: EVENTS_STATUS_DONE_REQUEST,
    params: params
  };
}
