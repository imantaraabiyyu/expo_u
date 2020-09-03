import {
  FIND_TRANSACTIONS_FAILURE,
  FIND_TRANSACTIONS_REQUEST,
  FIND_TRANSACTIONS_SUCCESS,
  FIND_TRANSACTION_FAILURE,
  FIND_TRANSACTION_REQUEST,
  FIND_TRANSACTION_SUCCESS,
  SAVE_TRANSACTION_SUCCESS,
  SAVE_TRANSACTION_FAILURE,
  SAVE_TRANSACTION_REQUEST,
  FIND_USER_TRANSACTION_REQUEST,
  FIND_USER_TRANSACTION_FAILURE,
  FIND_USER_TRANSACTION_SUCCESS,
  FIND_TICKETS_TRANSACTION_SUCCESS,
  FIND_TICKETS_TRANSACTION_FAILURE,
  FIND_TICKETS_TRANSACTION_REQUEST,
  CHECK_TRANSACTION_SUCCESS,
  CHECK_TRANSACTION_FAILURE,
  CHECK_TRANSACTION_REQUEST
} from '../actions/constants';
import { put, takeLatest } from 'redux-saga/effects';
import store from '../configs/store';
import { instanceAxios } from '../utils/apiUtil';

function* findById(action) {
  try {
    const data = yield instanceAxios.get(`transactions/${action.id}`);
    yield put({
      type: FIND_TRANSACTION_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: FIND_TRANSACTION_FAILURE,
      error: error
    });
  }
}

function* findAll(action) {
  const { sort = 'asc', page = 0, size = 10 } = action.params || {};
  const { id } = store.getState().auth.data;
  try {
    const data = yield instanceAxios.get(`users/${id}/transactions`, {
      params: { sort, page, size }
    });

    console.log(data);

    yield put({
      type: FIND_TRANSACTIONS_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: FIND_TRANSACTIONS_FAILURE,
      error: error
    });
  }
}

function* save(action) {
  const user = { id: store.getState().auth.data.id };
  const { type, grand, paymentMethod, pricing, quantity } = action.data;
  try {
    const data = yield type === 0
      ? instanceAxios.post(`transactions?type=${type}`, {
          paymentMethod,
          user,
          grand,
          pricing,
          quantity
        })
      : instanceAxios.post(`transactions?type=${type}`, {
          paymentMethod,
          user,
          grand
        });

    yield put({
      type: SAVE_TRANSACTION_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: SAVE_TRANSACTION_FAILURE,
      error: error
    });
  }
}

function* findByUserId(action) {
  const { id } = store.getState().auth.data;
  try {
    const data = yield instanceAxios.get(`users/${id}/transactions`);
    yield put({
      type: FIND_USER_TRANSACTION_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: FIND_USER_TRANSACTION_FAILURE,
      error: error
    });
  }
}

function* findTicketsByTransactionId(action) {
  try {
    const data = yield instanceAxios.get(`transactions/${action.id}/tickets`);
    yield put({
      type: FIND_TICKETS_TRANSACTION_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: FIND_TICKETS_TRANSACTION_FAILURE,
      error: error
    });
  }
}

function* checkTransactionId(action) {
  const { id } = action;
  console.log(id);
  try {
    const data = yield instanceAxios.patch(`transactions/${id}/scan`);
    yield put({
      type: CHECK_TRANSACTION_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: CHECK_TRANSACTION_FAILURE,
      error: error
    });
  }
}

export function* watchcheckTransactionId() {
  yield takeLatest(CHECK_TRANSACTION_REQUEST, checkTransactionId);
}

export function* watchTicketsByTransactionId() {
  yield takeLatest(
    FIND_TICKETS_TRANSACTION_REQUEST,
    findTicketsByTransactionId
  );
}

export function* watchUserTransaction() {
  yield takeLatest(FIND_USER_TRANSACTION_REQUEST, findByUserId);
}
export function* watchSaveTransaction() {
  yield takeLatest(SAVE_TRANSACTION_REQUEST, save);
}
export function* watchFindTransactionById() {
  yield takeLatest(FIND_TRANSACTION_REQUEST, findById);
}
export function* watchFindTransactions() {
  yield takeLatest(FIND_TRANSACTIONS_REQUEST, findAll);
}
