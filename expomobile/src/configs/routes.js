import {
  EventAudience,
  EventDetailAudience,
  EventPaymentAudience,
  HistoryTransactionAudience,
  HomeAudience,
  ProfileAudience,
  WalletAudience,
  TransactionAudience,
  TopUpCredit
} from '../screens/audience';
import {
  AddEventEO,
  EventEO,
  EventsList,
  EventTier,
  Generator,
  HomeEO,
  MerchantEO,
  ProfileEO,
  Scanning,
  TransactionEO,
  WalletEO,
  TicketList,
  EventPaymentEO,
  TopUpCreditEO,
  TopUpDetailEO
} from '../screens/eventorganizer';
import {
  MainAudience,
  MainEventOrganizer,
  MainMerchant
} from '../screens/main';
import {
  EventDetailMerchant,
  EventMerchant,
  HistoryEvent,
  HomeMerchant,
  ProfileMerchant,
  SubmissionMerchant,
  Approval
} from '../screens/merchant';

import { SaveData } from '../screens/splash';
import TopUpDetail from '../screens/audience/wallet/TopUpDetail';

const eoRoutes = [
  {
    name: 'MainEO',
    component: MainEventOrganizer
  },
  {
    name: 'EventEO',
    component: EventEO
  },
  {
    name: 'EventTier',
    component: EventTier
  },
  {
    name: 'EventsList',
    component: EventsList
  },
  {
    name: 'AddEventEO',
    component: AddEventEO
  },
  {
    name: 'EventPayment',
    component: EventPaymentEO
  },
  {
    name: 'MerchantEO',
    component: MerchantEO
  },
  {
    name: 'WalletEO',
    component: WalletEO
  },
  {
    name: 'Scan',
    component: Scanning
  },
  {
    name: 'Generator',
    component: Generator
  },
  {
    name: 'SaveData',
    component: SaveData
  },
  {
    name: 'TicketList',
    component: TicketList
  },
  {
    name: 'TopUpCredit',
    component: TopUpCreditEO
  },
  { name: 'TopUpDetail', component: TopUpDetailEO }
];

const audienceRoutes = [
  {
    name: 'MainAudience',
    component: MainAudience
  },
  {
    name: 'Event',
    component: EventAudience
  },
  {
    name: 'Home',
    component: HomeAudience
  },
  {
    name: 'EventDetail',
    component: EventDetailAudience
  },
  {
    name: 'EventPayment',
    component: EventPaymentAudience
  },
  {
    name: 'Transaction',
    icon: 'clipboard',
    component: TransactionAudience
  },
  {
    name: 'HistoryTransaction',
    component: HistoryTransactionAudience
  },
  {
    name: 'WalletUser',
    component: WalletAudience
  },
  {
    name: 'TopUpCredit',
    component: TopUpCredit
  },
  {
    name: 'TopUpDetail',
    component: TopUpDetail
  }
];

const merchantRoutes = [
  {
    name: 'MainMerchant',
    component: MainMerchant
  },
  {
    name: 'Home',
    component: HomeMerchant
  },
  {
    name: 'Event',
    component: EventMerchant
  },
  {
    name: 'EventDetail',
    component: EventDetailMerchant
  },
  {
    name: 'WalletUser',
    component: WalletAudience
  },
  {
    name: 'EventMerchant',
    component: EventMerchant
  },
  {
    name: 'Submission',
    component: SubmissionMerchant
  },
  {
    name: 'HistoryEvent',
    component: HistoryEvent
  }
];

const bottomRoutesAudience = [
  {
    name: 'Home',
    icon: 'home',
    component: HomeAudience
  },
  {
    name: 'Transaction',
    icon: 'clipboard',
    component: TransactionAudience
  },
  {
    name: 'Profile',
    icon: 'user-tie',
    component: ProfileAudience
  }
];

const bottomRoutesEO = [
  {
    name: 'Home',
    icon: 'home',
    component: HomeEO
  },
  {
    name: 'Transaction',
    icon: 'clipboard',
    component: TransactionEO
  },
  {
    name: 'Scan',
    icon: 'vector-square',
    component: Scanning
  },
  {
    name: 'Profile',
    icon: 'user-tie',
    component: ProfileEO
  }
];

const bottomRoutesEvents = [
  {
    name: 'Scan',
    icon: 'vector-square',
    component: Scanning
  }
];

const bottomRoutesMerchant = [
  {
    name: 'Home',
    icon: 'home',
    component: HomeMerchant
  },
  // {
  //   name: 'Approval',
  //   icon: 'tasks',
  //   component: Approval
  // },
  {
    name: 'Profile',
    icon: 'user-tie',
    component: ProfileMerchant
  }
];

export {
  eoRoutes,
  audienceRoutes,
  merchantRoutes,
  bottomRoutesAudience,
  bottomRoutesEO,
  bottomRoutesEvents,
  bottomRoutesMerchant
};
