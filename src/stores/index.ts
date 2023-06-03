import { injectStores } from '@mobx-devtools/tools';

import ConverterStore from './converterStore';
import CurrenciesStore from './currenciesStore';

injectStores({
    ConverterStore,
    CurrenciesStore,
});

const stores = {
    //ConverterStore: new ConverterStore(),
    // CurrenciesStore: new CurrenciesStore(),
};

export default { ConverterStore, CurrenciesStore };
