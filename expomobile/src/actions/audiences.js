import {
  SAVE_AUDIENCE_REQUEST,
  FIND_AUDIENCE_REQUEST,
  FIND_AUDIENCES_REQUEST
} from './constants';

export function save(data) {
  return {
    type: SAVE_AUDIENCE_REQUEST,
    data: data
  };
}

export function findById(id) {
  return {
    type: FIND_AUDIENCE_REQUEST,
    id: id
  };
}

export function findAll(params) {
  return {
    type: FIND_AUDIENCES_REQUEST,
    params: params
  };
}
