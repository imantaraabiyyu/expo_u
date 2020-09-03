import {
  SAVE_EO_REQUEST,
  FIND_EO_REQUEST,
  FIND_EOS_REQUEST
} from './constants';

export function save(data) {
  return {
    type: SAVE_EO_REQUEST,
    data: data
  };
}

export function findById(id) {
  return {
    type: FIND_EO_REQUEST,
    id: id
  };
}

export function findAll(params) {
  return {
    type: FIND_EOS_REQUEST,
    params: params
  };
}
