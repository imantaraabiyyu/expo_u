import { combineReducers } from 'redux';
import { auth } from './auth';
import { savedAudience, audienceById, audiences } from './audiences';
import {
  savedEvent,
  eventById,
  events,
  eventsStatus,
  eventsStatusOnSchedule,
  eventsStatusOnProgress,
  eventsStatusDone,
  eventMerchants
} from './events';
import { savedMerchant, merchantById, merchants } from './merchants';
import { savedEO, EOById, EOs } from './eventorganizers';
import { userCredit } from './credits';
import {
  saveTransaction,
  findUserTransactions,
  findTicketsByTransactionId,
  checkTransactionId
} from './transactions';
import { findCategories } from './category';

export default combineReducers({
  auth,
  savedEvent,
  eventById,
  events,
  eventsStatus,
  eventsStatusOnSchedule,
  eventsStatusOnProgress,
  eventsStatusDone,
  eventMerchants,
  savedAudience,
  audienceById,
  audiences,
  savedMerchant,
  merchantById,
  merchants,
  savedEO,
  EOById,
  EOs,
  userCredit,
  saveTransaction,
  findUserTransactions,
  findCategories,
  findTicketsByTransactionId,
  checkTransactionId
});
