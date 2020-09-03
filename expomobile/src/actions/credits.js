import { USER_CREDIT_REQUEST, USER_HISTORY_CREDIT_REQUEST } from './constants';

export function findCreditByUserId(id) {
  return {
    type: USER_CREDIT_REQUEST,
    id: id
  };
}

export function findCreditHistoryByUserId(id) {
  return {
    type: USER_HISTORY_CREDIT_REQUEST,
    id: id
  };
}
