import { put, takeLatest } from 'redux-saga/effects';
import {
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS
} from '../actions/constants';
import { instanceAxios } from '../utils/apiUtil';

import AsyncStorage from '@react-native-community/async-storage';

function* register(action) {
  try {
    const { username, email, password, type } = action.data;
    const data = yield instanceAxios.post(`users?type=${type}`, {
      username,
      email,
      password
    });

    const { token, role, profileId, photo, id } = data;
    yield AsyncStorage.setItem('email', email);
    yield AsyncStorage.setItem('token', token);
    yield AsyncStorage.setItem('role', role);
    yield AsyncStorage.setItem('profileId', profileId);
    yield AsyncStorage.setItem('photo', photo);
    yield AsyncStorage.setItem('username', username);
    yield AsyncStorage.setItem('id', id);
    yield put({
      type: REGISTER_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: REGISTER_FAILURE,
      error: error
    });
  }
}

export function* watchRegister() {
  yield takeLatest(REGISTER_REQUEST, register);
}
