import {
  FIND_TRANSACTIONS_REQUEST,
  FIND_TRANSACTION_REQUEST,
  SAVE_TRANSACTION_REQUEST,
  FIND_USER_TRANSACTION_REQUEST,
  FIND_TICKETS_TRANSACTION_REQUEST,
  CHECK_TRANSACTION_REQUEST
} from './constants';

export function findById(id) {
  return {
    type: FIND_TRANSACTION_REQUEST,
    id: id
  };
}

export function findAll(params) {
  return {
    type: FIND_TRANSACTIONS_REQUEST,
    params: params
  };
}

export function save(data) {
  return {
    type: SAVE_TRANSACTION_REQUEST,
    data: data
  };
}

export function findByUserId(id) {
  return {
    type: FIND_USER_TRANSACTION_REQUEST,
    id: id
  };
}

export function findByTicketsByTransactionId(id) {
  return {
    type: FIND_TICKETS_TRANSACTION_REQUEST,
    id: id
  };
}

export function checkTransactionId(id) {
  return {
    type: CHECK_TRANSACTION_REQUEST,
    id: id
  };
}
