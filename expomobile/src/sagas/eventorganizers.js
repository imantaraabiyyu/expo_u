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
import { put, takeLatest } from 'redux-saga/effects';
import { instanceAxios } from '../utils/apiUtil';

function* save(action) {
  const {
    name,
    address,
    city,
    description,
    npwpNumber,
    siupNumber,
    phone,
    photo
  } = action.data;
  const file = photo;

  let formData = new FormData();
  formData.append('name', name);
  formData.append('address', address);
  formData.append('city', city);
  formData.append('description', description);
  formData.append('npwpNumber', npwpNumber);
  formData.append('siupNumber', siupNumber);
  formData.append('phone', phone);

  formData.append('file', file);
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  };

  console.log('file', file);

  const id = action.data?.profileId;

  try {
    const data = yield instanceAxios.put(`eo/${id}`, formData, config);
    console.log(data);

    yield put({
      type: SAVE_EO_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: SAVE_EO_FAILURE,
      error: error
    });
  }
}

function* findById(action) {
  try {
    const data = yield instanceAxios.get(`eo/${action.id}`);

    yield put({
      type: FIND_EO_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: FIND_EO_FAILURE,
      error: error
    });
  }
}

function* findAll(action) {
  const { sort = 'asc', page = 0, size = 10 } = action.params || {};
  try {
    const data = yield instanceAxios.get('eo', {
      params: { sort, page, size }
    });

    yield put({
      type: FIND_EOS_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: FIND_EOS_FAILURE,
      error: error
    });
  }
}

export function* watchSaveEO() {
  yield takeLatest(SAVE_EO_REQUEST, save);
}
export function* watchFindEOById() {
  yield takeLatest(FIND_EO_REQUEST, findById);
}
export function* watchFindEOs() {
  yield takeLatest(FIND_EOS_REQUEST, findAll);
}
