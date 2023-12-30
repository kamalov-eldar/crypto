import { ConverterStore } from "./converterStore";
import { CurrenciesStore } from "./currenciesStore";

class RootStore {
    converterStore: ConverterStore;
    currenciesStore: CurrenciesStore;

    constructor() {
        this.converterStore = new ConverterStore({ rootStore: this });
        this.currenciesStore = new CurrenciesStore({ rootStore: this });
    }
}

export default RootStore;
