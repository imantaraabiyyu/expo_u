import { all, fork } from 'redux-saga/effects';
import {
  watchFindAudienceById,
  watchFindAudiences,
  watchSaveAudience
} from './audiences';
import { watchLogin, watchLogout, watchRestoreToken } from './auth';
import { watchFindCategories } from './category';
import {
  watchFindCreditByUserId,
  watchFindCreditHistoryByUserId
} from './credits';
import { watchFindEOById, watchFindEOs, watchSaveEO } from './eventorganizers';
import {
  watchFindEventById,
  watchFindEvents,
  watchFindEventsStatus,
  watchFindEventsStatusDone,
  watchFindEventsStatusOnProgress,
  watchFindEventsStatusOnSchedule,
  watchSaveEvent
} from './events';
import {
  watchFindMerchantById,
  watchFindMerchants,
  watchSaveMerchant
} from './merchants';
import { watchRegister } from './register';
import {
  watchcheckTransactionId,
  watchSaveTransaction,
  watchTicketsByTransactionId,
  watchUserTransaction
} from './transactions';

export default function* rootSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchRestoreToken),
    fork(watchFindAudienceById),
    fork(watchSaveAudience),
    fork(watchFindAudiences),
    fork(watchSaveEvent),
    fork(watchFindEventById),
    fork(watchFindEvents),
    fork(watchFindEventsStatus),
    fork(watchFindEventsStatusOnSchedule),
    fork(watchFindEventsStatusOnProgress),
    fork(watchFindEventsStatusDone),
    fork(watchSaveEO),
    fork(watchFindEOById),
    fork(watchFindEOs),
    fork(watchSaveMerchant),
    fork(watchFindMerchantById),
    fork(watchFindMerchants),
    fork(watchRegister),
    fork(watchFindCreditByUserId),
    fork(watchSaveTransaction),
    fork(watchFindCategories),
    fork(watchUserTransaction),
    fork(watchTicketsByTransactionId),
    fork(watchFindCreditHistoryByUserId),
    fork(watchcheckTransactionId)
  ]);
}
