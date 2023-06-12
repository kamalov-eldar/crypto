import { CoinsResponse, TCoin, TCoinDiff } from '../types';
import { makeAutoObservable, makeObservable, observable } from 'mobx';
import axios, { isCancel, AxiosError } from 'axios';
import { fetchCoins } from '../api/api';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';

class CurrenciesStore {
    data?: IPromiseBasedObservable<TCoin[]>;

    coins: TCoin[] = [];

    diffObj: TCoinDiff = {};

    constructor() {
        makeAutoObservable(this);
        /*  makeObservable(this, {
            coins: observable,
            diffObj: observable,
        }); */
    }

    setItems = (newCoinsArr: TCoin[]): void => {
        const oldCoinsArr = this.coins;
        this.diffObj =
            this.diffPriceCoins(oldCoinsArr, newCoinsArr).length === 0
                ? (this.diffObj = this.diffObj)
                : this.diffPriceCoins(oldCoinsArr, newCoinsArr).reduce((initObj: TCoinDiff, obj: TCoin) => {
                      const newCoin: TCoin = newCoinsArr.find((item) => item.name === obj.name) || obj;
                      const oldCoin: TCoin = oldCoinsArr.find((itemObj) => itemObj.name === newCoin.name) || newCoin;
                      const color: string = newCoin.price === oldCoin.price ? '' : newCoin.price > oldCoin.price ? '#3d9400' : '#A11B0A';
                      initObj[newCoin.name] = color;
                      return initObj;
                  }, {});
        this.coins = newCoinsArr;
    };
    /*
    fetchCoins() {
        axios.get(`https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD`).then(({ data }) => {
            const coins: TCoin[] = data.Data.map((coin: any) => {
                //console.log('coin: ', coin);
                const obj: TCoin = {
                    id: coin.CoinInfo.Id,
                    name: coin.CoinInfo.Name,
                    fullName: coin.CoinInfo.FullName,
                    imageUrl: `https://www.cryptocompare.com/${coin.CoinInfo.ImageUrl}`,
                    price: coin.DISPLAY.USD.PRICE,
                    volume24hour: coin.DISPLAY.USD.VOLUME24HOUR,
                };
                return obj;
            });
            this.setItems(coins);
        });
    } */

    diffPriceCoins(arr1: TCoin[], arr2: TCoin[]) {
        return arr1.filter((item, index) => item.price !== arr2[index].price);
    }

    getCoins = () => {
        console.log('getCoins: ');
        // this.setItems(await fetchCoins());
        this.setItems(
            fromPromise(fetchCoins()).case({
                fulfilled: (data) => data,
            }),
        );
        this.data = fromPromise(fetchCoins());
        //  this.setItems(this.data.value as TCoin[]);
    };
}

//export default CurrenciesStore;
export const currenciesStore = new CurrenciesStore();
