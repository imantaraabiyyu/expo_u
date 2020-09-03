import { put, takeLatest } from 'redux-saga/effects';
import {
  FIND_CATEGORY_FAILURE,
  FIND_CATEGORY_REQUEST,
  FIND_CATEGORY_SUCCESS
} from '../actions/constants';
import { instanceAxios } from '../utils/apiUtil';

function* findCategories() {
  try {
    const data = yield instanceAxios.get(`categories`);

    yield put({
      type: FIND_CATEGORY_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: FIND_CATEGORY_FAILURE,
      error: error
    });
  }
}

export function* watchFindCategories() {
  yield takeLatest(FIND_CATEGORY_REQUEST, findCategories);
}
