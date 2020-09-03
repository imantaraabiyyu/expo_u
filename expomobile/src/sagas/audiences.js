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
import { put, takeLatest } from 'redux-saga/effects';
import { instanceAxios } from '../utils/apiUtil';

function* save(action) {
  const { id, age, gender, phone } = action.data;

  try {
    const data = yield id
      ? instanceAxios.put(`audiences/${id}`, {
          age,
          gender,
          phone
        })
      : instanceAxios.post('audiences', {
          age,
          gender,
          phone
        });
    yield put({
      type: SAVE_AUDIENCE_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: SAVE_AUDIENCE_FAILURE,
      error: error
    });
  }
}

function* findById(action) {
  try {
    const data = yield instanceAxios.get(`audiences/${action.id}`);
    yield put({
      type: FIND_AUDIENCE_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: FIND_AUDIENCE_FAILURE,
      error: error
    });
  }
}

function* findAll(action) {
  const { sort = 'asc', page = 0, size = 10 } = action.params || {};
  try {
    const data = yield instanceAxios.get('audiences', {
      params: { sort, page, size }
    });

    yield put({
      type: FIND_AUDIENCES_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: FIND_AUDIENCES_FAILURE,
      error: error
    });
  }
}

export function* watchSaveAudience() {
  yield takeLatest(SAVE_AUDIENCE_REQUEST, save);
}
export function* watchFindAudienceById() {
  yield takeLatest(FIND_AUDIENCE_REQUEST, findById);
}
export function* watchFindAudiences() {
  yield takeLatest(FIND_AUDIENCES_REQUEST, findAll);
}
