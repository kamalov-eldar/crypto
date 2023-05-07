import { TCoin } from '../types';
import { observable } from 'mobx';
import { action, computed, makeAutoObservable } from 'mobx';

class ConverterStore {
    //@observable public items: TCoin[];
    selectCoin1: TCoin = {} as TCoin;
    selectCoin2: TCoin = {} as TCoin;

    quantity1: number = 0;
    quantity2: number = 0;

    volume1: number | null = null;
    volume2: number | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setSelectedCoin1(coin: TCoin) {
        this.selectCoin1 = coin;
    }
    setSelectedCoin2(coin: TCoin) {
        //console.log('setSelectedCoin2: ', JSON.stringify(coin));
        this.selectCoin2 = coin;
        //.replace(/%/g,'') удаляем все % в строке
        /*  const priceToNumber1 = Number(JSON.stringify(this.selectCoin1.price).slice(3).slice(0, -1).replace(/,/g, ''));
        const priceToNumber2 = Number(JSON.stringify(this.selectCoin2.price).slice(3).slice(0, -1).replace(/,/g, ''));
        if (this.quantity1) {
            this.volume2 = (priceToNumber1 * (Number(this.quantity1) || 1)) / priceToNumber2;
        } else this.volume2 = this.volume2; */
    }
    setQuantity1(value: number) {
        this.quantity1 = value;
    }

    setQuantity2(value: number) {
        this.quantity2 = value;
    }

    setVolume1() {
        if (JSON.stringify(this.selectCoin1.price) && JSON.stringify(this.selectCoin2.price)) {
            const priceToNumber1 = Number(JSON.stringify(this.selectCoin1.price).slice(3).slice(0, -1).replace(/,/g, ''));
            const priceToNumber2 = Number(JSON.stringify(this.selectCoin2.price).slice(3).slice(0, -1).replace(/,/g, ''));

            const summ1 = priceToNumber1 * (this.quantity1 || 1);
            const summ2 = priceToNumber2 * this.quantity2;
            console.log('summ2: ', summ2);
            console.log('summ1: ', summ1);

            this.volume1 = summ2 / summ1;

            console.log('setVolume1: ', { quantity1: this.quantity1, quantity2: this.quantity2, ['this.volume1']: this.volume1, ['this.volume2']: this.volume2, priceToNumber2: priceToNumber2, priceToNumber1: priceToNumber1 });
        }
    }

    setVolume2() {
        if (JSON.stringify(this.selectCoin1.price) && JSON.stringify(this.selectCoin2.price)) {
            const priceToNumber1 = Number(JSON.stringify(this.selectCoin1.price).slice(3).slice(0, -1).replace(/,/g, ''));
            const priceToNumber2 = Number(JSON.stringify(this.selectCoin2.price).slice(3).slice(0, -1).replace(/,/g, ''));

            const summ1 = priceToNumber1 * this.quantity1;
            const summ2 = priceToNumber2 * (this.quantity2 || 1);
            console.log('summ2: ', summ2);
            console.log('summ1: ', summ1);

            this.volume2 = summ1 / summ2;

            console.log('setVolume2: ', { quantity1: this.quantity1, quantity2: this.quantity2, ['this.volume1']: this.volume1, ['this.volume2']: this.volume2, priceToNumber2: priceToNumber2, priceToNumber1: priceToNumber1 });
        }
    }
}

export default new ConverterStore();
