import { put, takeLatest } from 'redux-saga/effects';
import {
  USER_CREDIT_FAILURE,
  USER_CREDIT_REQUEST,
  USER_CREDIT_SUCCESS,
  USER_HISTORY_CREDIT_REQUEST,
  USER_HISTORY_CREDIT_FAILURE,
  USER_HISTORY_CREDIT_SUCCESS
} from '../actions/constants';
import { instanceAxios } from '../utils/apiUtil';

function* findCreditByUserId(action) {
  const { id } = action;
  try {
    const data = yield instanceAxios.get(`users/credit/${id}`);
    yield put({
      type: USER_CREDIT_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: USER_CREDIT_FAILURE,
      error: error
    });
  }
}

function* findCreditHistoryByUserId(action) {
  const { id } = action;
  try {
    const data = yield instanceAxios.get(`users/credit/${id}`);
    yield put({
      type: USER_HISTORY_CREDIT_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: USER_HISTORY_CREDIT_FAILURE,
      error: error
    });
  }
}

export function* watchFindCreditByUserId() {
  yield takeLatest(USER_CREDIT_REQUEST, findCreditByUserId);
}

export function* watchFindCreditHistoryByUserId() {
  yield takeLatest(USER_HISTORY_CREDIT_REQUEST, findCreditHistoryByUserId);
}
