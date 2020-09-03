import {
  SAVE_MERCHANT_REQUEST,
  SAVE_MERCHANT_SUCCESS,
  SAVE_MERCHANT_FAILURE,
  FIND_MERCHANT_REQUEST,
  FIND_MERCHANT_SUCCESS,
  FIND_MERCHANT_FAILURE,
  FIND_MERCHANTS_REQUEST,
  FIND_MERCHANTS_SUCCESS,
  FIND_MERCHANTS_FAILURE
} from '../actions/constants';
import { put, takeLatest } from 'redux-saga/effects';
import { instanceAxios } from '../utils/apiUtil';

function* save(action) {
  const {
    id,
    name,
    phone,
    city,
    address,
    description,
    idCardNumber,
    idCardType
  } = action.data;

  try {
    const data = yield id
      ? instanceAxios.put(`merchants/${id}`, {
          name,
          phone,
          city,
          address,
          description,
          idCardNumber,
          idCardType
        })
      : instanceAxios.post('merchants', {
          name,
          phone,
          city,
          address,
          description,
          idCardNumber,
          idCardType
        });
    yield put({
      type: SAVE_MERCHANT_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: SAVE_MERCHANT_FAILURE,
      error: error
    });
  }
}

function* findById(action) {
  try {
    const data = yield instanceAxios.get(`merchants/${action.id}`);
    console.log(data);
    yield put({
      type: FIND_MERCHANT_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: FIND_MERCHANT_FAILURE,
      error: error
    });
  }
}

function* findAll(action) {
  const { sort = 'asc', page = 0, size = 10 } = action.params || {};
  try {
    const data = yield instanceAxios.get('merchants', {
      params: { sort, page, size }
    });

    yield put({
      type: FIND_MERCHANTS_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: FIND_MERCHANTS_FAILURE,
      error: error
    });
  }
}

export function* watchSaveMerchant() {
  yield takeLatest(SAVE_MERCHANT_REQUEST, save);
}
export function* watchFindMerchantById() {
  yield takeLatest(FIND_MERCHANT_REQUEST, findById);
}
export function* watchFindMerchants() {
  yield takeLatest(FIND_MERCHANTS_REQUEST, findAll);
}
