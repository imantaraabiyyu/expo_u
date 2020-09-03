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
  EVENTS_STATUS_ONSCHEDULE_FAILURE,
  EVENTS_STATUS_ONSCHEDULE_REQUEST,
  EVENTS_STATUS_ONSCHEDULE_SUCCESS,
  EVENTS_STATUS_DONE_FAILURE,
  EVENTS_STATUS_DONE_SUCCESS,
  EVENTS_STATUS_DONE_REQUEST,
  EVENTS_STATUS_ONPROGRESS_FAILURE,
  EVENTS_STATUS_ONPROGRESS_REQUEST,
  EVENTS_STATUS_ONPROGRESS_SUCCESS
} from '../actions/constants';
import { put, takeLatest } from 'redux-saga/effects';
import { instanceAxios } from '../utils/apiUtil';
const qs = require('qs');

function* save(action) {
  const {
    id,
    name,
    organizer,
    startDate,
    endDate,
    formatStartTime,
    formatEndTime,
    pricings,
    location,
    capacity,
    eventStatus,
    audienceTier,
    eventTier,
    description,
    categories
  } = action.data;

  console.log(action, 'dada');

  try {
    const data = yield id
      ? instanceAxios.put(`events/${id}`, {
          name,
          startDate,
          endDate,
          organizer,
          startTime: formatStartTime,
          endTime: formatEndTime,
          pricings,
          location,
          capacity,
          eventStatus,
          audienceTier,
          eventTier,
          description,
          categories
        })
      : instanceAxios.post('events', {
          id,
          name,
          startDate,
          endDate,
          organizer,
          startTime: formatStartTime,
          endTime: formatEndTime,
          location,
          pricings,
          capacity,
          eventStatus,
          audienceTier,
          eventTier,
          description,
          categories
        });
    yield put({
      type: SAVE_EVENT_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: SAVE_EVENT_FAILURE,
      error: error
    });
  }
}

function* findById(action) {
  try {
    const data = yield instanceAxios.get(`events/${action.id}`);

    yield put({
      type: FIND_EVENT_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: FIND_EVENT_FAILURE,
      error: error
    });
  }
}

function* findAll(action) {
  const { sort = 'asc', page = 0, size = 10, categories = [] } =
    action.params || {};

  console.log(categories);

  try {
    const data = yield instanceAxios.get(`events`, {
      params: { sort, page, size, categories: [...categories] },
      paramsSerializer: function(params) {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      }
    });

    yield put({
      type: FIND_EVENTS_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: FIND_EVENTS_FAILURE,
      error: error
    });
  }
}

function* findByStatus(action) {
  const { id, status } = action.params;
  const { sort = 'asc', page = 0, size = 10 } = action.params || {};
  try {
    const data = yield instanceAxios.get(`events?eo=${id}&status=${status}`, {
      params: { sort, page, size }
    });

    yield put({
      type: FIND_STATUS_EVENTS_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: FIND_STATUS_EVENTS_FAILURE,
      error: error
    });
  }
}

function* findStatusOnSchedule(action) {
  const { id } = action.params;
  console.log(action.params);

  const { sort = 'asc', page = 0, size = 10 } = action.params || {};
  try {
    const data = yield instanceAxios.get(`events?eo=${id}&status=2`, {
      params: { sort, page, size }
    });
    console.log('data', data);

    yield put({
      type: EVENTS_STATUS_ONSCHEDULE_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: EVENTS_STATUS_ONSCHEDULE_FAILURE,
      error: error
    });
  }
}
function* findStatusOnProgress(action) {
  const { id } = action.params;
  console.log(action.params);

  const { sort = 'asc', page = 0, size = 10 } = action.params || {};
  try {
    const data = yield instanceAxios.get(`events?eo=${id}&status=0`, {
      params: { sort, page, size }
    });
    console.log('progress', data);

    yield put({
      type: EVENTS_STATUS_ONPROGRESS_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: EVENTS_STATUS_ONPROGRESS_FAILURE,
      error: error
    });
  }
}
function* findStatusDone(action) {
  const { id } = action.params;
  console.log(action.params);

  const { sort = 'asc', page = 0, size = 10 } = action.params || {};
  try {
    const data = yield instanceAxios.get(`events?eo=${id}&status=1`, {
      params: { sort, page, size }
    });
    console.log('done', data);
    yield put({
      type: EVENTS_STATUS_DONE_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: EVENTS_STATUS_DONE_FAILURE,
      error: error
    });
  }
}

export function* watchSaveEvent() {
  yield takeLatest(SAVE_EVENT_REQUEST, save);
}
export function* watchFindEventById() {
  yield takeLatest(FIND_EVENT_REQUEST, findById);
}
export function* watchFindEvents() {
  yield takeLatest(FIND_EVENTS_REQUEST, findAll);
}
export function* watchFindEventsStatus() {
  yield takeLatest(FIND_STATUS_EVENTS_REQUEST, findByStatus);
}
export function* watchFindEventsStatusOnSchedule() {
  yield takeLatest(EVENTS_STATUS_ONSCHEDULE_REQUEST, findStatusOnSchedule);
}
export function* watchFindEventsStatusOnProgress() {
  yield takeLatest(EVENTS_STATUS_ONPROGRESS_REQUEST, findStatusOnProgress);
}
export function* watchFindEventsStatusDone() {
  yield takeLatest(EVENTS_STATUS_DONE_REQUEST, findStatusDone);
}
