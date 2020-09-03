import {
  SAVE_MERCHANT_REQUEST,
  FIND_MERCHANT_REQUEST,
  FIND_MERCHANTS_REQUEST
} from './constants';

export function save(data) {
  return {
    type: SAVE_MERCHANT_REQUEST,
    data: data
  };
}

export function findById(id) {
  return {
    type: FIND_MERCHANT_REQUEST,
    id: id
  };
}

export function findAll(params) {
  return {
    type: FIND_MERCHANTS_REQUEST,
    params: params
  };
}
