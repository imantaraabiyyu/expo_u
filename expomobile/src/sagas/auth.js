import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  RESTORE_TOKEN_SUCCESS,
  RESTORE_TOKEN_FAILURE,
  RESTORE_TOKEN_REQUEST
} from '../actions/constants';
import { call, put, takeLatest } from 'redux-saga/effects';
import { instanceAxios } from '../utils/apiUtil';
import AsyncStorage from '@react-native-community/async-storage';
import { GoogleSignin } from '@react-native-community/google-signin';

import { LoginManager } from 'react-native-fbsdk';

function* login(action) {
  const userdata = action.data;

  try {
    const data = yield userdata.type === 0
      ? instanceAxios.post('auth', {
          ...userdata
        })
      : userdata.type === 1
      ? instanceAxios.post('auth/facebook', {
          ...userdata
        })
      : instanceAxios.post('auth/google', {
          ...userdata
        });

    const { email, token, role, profileId, photo, username, id } = data;

    yield AsyncStorage.setItem('email', email);
    yield AsyncStorage.setItem('token', token);
    yield AsyncStorage.setItem('role', role);
    yield AsyncStorage.setItem('profileId', profileId);
    yield AsyncStorage.setItem('photo', photo);
    yield AsyncStorage.setItem('username', username);
    yield AsyncStorage.setItem('id', id);
    yield put({
      type: LOGIN_SUCCESS,
      data: data
    });
  } catch (error) {
    yield put({
      type: LOGIN_FAILURE,
      error: error
    });
    console.log(error);
  }
}

export function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, login);
}

function* logout() {
  try {
    yield AsyncStorage.removeItem('email');
    yield AsyncStorage.removeItem('token');
    yield AsyncStorage.removeItem('role');
    yield AsyncStorage.removeItem('profileId');
    yield AsyncStorage.removeItem('photo');
    yield AsyncStorage.removeItem('username');
    yield AsyncStorage.removeItem('id');
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
    LoginManager.logOut();
    yield put({
      type: LOGOUT_SUCCESS
    });
  } catch (error) {
    yield put({
      type: LOGOUT_FAILURE,
      error: error
    });
  }
}

export function* watchLogout() {
  yield takeLatest(LOGOUT_REQUEST, logout);
}

const delay = time => new Promise(resolve => setTimeout(resolve, time));

function* restoreToken() {
  yield call(delay, 1000);
  try {
    const email = yield AsyncStorage.getItem('email');
    const token = yield AsyncStorage.getItem('token');
    const role = yield AsyncStorage.getItem('role');
    const profileId = yield AsyncStorage.getItem('profileId');
    const photo = yield AsyncStorage.getItem('photo');
    const username = yield AsyncStorage.getItem('username');
    const id = yield AsyncStorage.getItem('id');
    yield put({
      type: RESTORE_TOKEN_SUCCESS,
      data: {
        email,
        token,
        role,
        profileId,
        photo,
        username,
        id
      }
    });
  } catch (error) {
    yield put({
      type: RESTORE_TOKEN_FAILURE,
      error: error
    });
  }
}

export function* watchRestoreToken() {
  yield takeLatest(RESTORE_TOKEN_REQUEST, restoreToken);
}
