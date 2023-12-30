import { TCoin } from "../types";
import RootStore from "./root-store";
import { action, makeObservable, observable } from "mobx";

export class ConverterStore {
    rootStore: RootStore;

    selectCoin1: TCoin | undefined;
    selectCoin2: TCoin | undefined;

    volume1: number | null = 0;
    volume2: number | null = 0;

    constructor({ rootStore }: { rootStore: RootStore }) {
        this.rootStore = rootStore;

        makeObservable(this, {
            selectCoin1: observable,
            selectCoin2: observable,
            volume1: observable,
            volume2: observable,

            setVolume: action,
            setSelectCoin1: action,
            setSelectCoin2: action,
            setSelectedCoin1: action,
            setSelectedCoin2: action,
            computeVolume1: action,
            computeVolume2: action,
        });
    }

    setVolume = (name: "Volume1" | "Volume2", value: number) => {
        if (name === "Volume1") {
            this.volume1 = value;
            this.computeVolume2();
        }

        if (name === "Volume2") {
            this.volume2 = value;
            this.computeVolume1();
        }
    };

    setSelectCoin1 = (selectCoinName: string) => {
        const coins = this.rootStore.currenciesStore.coins;

        const findCoinSelect1 = coins.find((item) => item.name === selectCoinName);
        const findCoinSelect2 = coins.find((item) => item.name === this.selectCoin2?.name);

        if (findCoinSelect1) {
            this.setSelectedCoin1(findCoinSelect1);
        }
        if (findCoinSelect2) {
            this.setSelectedCoin2(findCoinSelect2);
        }

        this.computeVolume1();
    };

    setSelectCoin2 = (selectCoinName: string) => {
        const coins = this.rootStore.currenciesStore.coins;

        const findCoinSelect2 = coins.find((item) => item.name === selectCoinName);
        const findCoinSelect1 = coins.find((item) => item.name === this.selectCoin1?.name);

        if (findCoinSelect2) {
            this.setSelectedCoin2(findCoinSelect2);
        }
        if (findCoinSelect1) {
            this.setSelectedCoin1(findCoinSelect1);
        }
        this.computeVolume2();
    };

    setSelectedCoin1(coin: TCoin) {
        this.selectCoin1 = coin;
    }
    setSelectedCoin2(coin: TCoin) {
        this.selectCoin2 = coin;
    }

    computeVolume1() {
        if (this.selectCoin1 && this.selectCoin2) {
            const summ2 = this.selectCoin2.price * (this.volume2 ?? 1);

            this.volume1 = summ2 / this.selectCoin1.price;
        }
    }

    computeVolume2() {
        if (this.selectCoin1 && this.selectCoin2) {
            const summ1 = this.selectCoin1.price * (this.volume1 ?? 1);

            this.volume2 = summ1 / this.selectCoin2.price;
        }
    }
}
