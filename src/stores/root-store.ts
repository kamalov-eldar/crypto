import { injectStores } from '@mobx-devtools/tools';

import { converterStore } from './converterStore';
import { currenciesStore } from './currenciesStore';

class RootStore {
    converterStore = converterStore;
    currenciesStore = currenciesStore;
}

export default RootStore;
