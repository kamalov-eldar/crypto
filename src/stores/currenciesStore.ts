import { TChangeColor, IMessage } from '../types';
import { action, computed, makeObservable, observable } from 'mobx';
import { fetchCoins, fetchTick } from '../api/api';
import { fromPromise } from 'mobx-utils';
import RootStore from './root-store';

export class CurrenciesStore {
    data = fromPromise(fetchCoins);
    rootStore: RootStore;
    newMessage: IMessage | undefined;
    changeСolor: TChangeColor = {};

    constructor({ rootStore }: { rootStore: RootStore }) {
        this.rootStore = rootStore;

        makeObservable(this, {
            data: observable,
            newMessage: observable,
            changeСolor: observable,

            coins: computed,
            arrCoinsName: computed,
            message: computed,

            getColors: action,
            getTickCoins: action,
        });
    }

    get coins() {
        console.log('get-coins: ');
        if (this.data.state === 'fulfilled') return this.data.value;
        return [];
    }

    get arrCoinsName() {
        console.log('arrCoinsName: ');
        return this.coins.map((coin) => coin.name);
    }

    get message() {
        console.log('get-message: ');
        if (this.newMessage) return this.newMessage;

        let message: IMessage = {};
        this.coins.forEach((coin) => {
            message[coin.name] = { price: coin.price };
        });
        return message;
    }

    getColors = (newMessage: IMessage) => {
        const oldMessage = this.message;
        Object.keys(oldMessage).forEach((coinName) => {
            const oldPrice = oldMessage[coinName]['price'];
            const newPrice = newMessage[coinName]['price'];
            const color: string = newPrice === oldPrice ? '#F5F5F5' : newPrice > oldPrice ? '#3d9400' : '#A11B0A';
            this.changeСolor[coinName] = color;
        });
        this.newMessage = newMessage;
    };

    getTickCoins = () => {
        if (this.arrCoinsName.length) {
            fetchTick(this.arrCoinsName).then((newMessage) => {
                this.getColors(newMessage);
            });
        }
    };
}

//export const currenciesStore = new CurrenciesStore();
