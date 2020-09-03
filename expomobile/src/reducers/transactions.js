import {
  FIND_TRANSACTIONS_FAILURE,
  FIND_TRANSACTIONS_REQUEST,
  FIND_TRANSACTIONS_SUCCESS,
  FIND_TRANSACTION_FAILURE,
  FIND_TRANSACTION_REQUEST,
  FIND_TRANSACTION_SUCCESS,
  SAVE_TRANSACTION_REQUEST,
  SAVE_TRANSACTION_SUCCESS,
  SAVE_TRANSACTION_FAILURE,
  FIND_USER_TRANSACTION_REQUEST,
  FIND_USER_TRANSACTION_SUCCESS,
  FIND_USER_TRANSACTION_FAILURE,
  FIND_TICKETS_TRANSACTION_REQUEST,
  FIND_TICKETS_TRANSACTION_SUCCESS,
  FIND_TICKETS_TRANSACTION_FAILURE,
  CHECK_TRANSACTION_REQUEST,
  CHECK_TRANSACTION_SUCCESS,
  CHECK_TRANSACTION_FAILURE
} from '../actions/constants';

const defaultState = { data: null, loading: false, error: null };

export function transactionId(state = defaultState, action) {
  switch (action.type) {
    case FIND_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FIND_TRANSACTION_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case FIND_TRANSACTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function transactions(state = defaultState, action) {
  switch (action.type) {
    case FIND_TRANSACTIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FIND_TRANSACTIONS_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case FIND_TRANSACTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function saveTransaction(state = defaultState, action) {
  switch (action.type) {
    case SAVE_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SAVE_TRANSACTION_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case SAVE_TRANSACTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function findUserTransactions(state = defaultState, action) {
  switch (action.type) {
    case FIND_USER_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FIND_USER_TRANSACTION_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case FIND_USER_TRANSACTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function findTicketsByTransactionId(state = defaultState, action) {
  switch (action.type) {
    case FIND_TICKETS_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FIND_TICKETS_TRANSACTION_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case FIND_TICKETS_TRANSACTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function checkTransactionId(state = defaultState, action) {
  switch (action.type) {
    case CHECK_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case CHECK_TRANSACTION_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null
      };
    case CHECK_TRANSACTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
