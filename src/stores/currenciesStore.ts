import { CoinsResponse, TCoin, TCoinDiff } from '../types';
import { makeAutoObservable, makeObservable, observable } from 'mobx';
import axios, { isCancel, AxiosError } from 'axios';
import { fetchCoins } from '../api/api';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';

class CurrenciesStore {
    data?: IPromiseBasedObservable<TCoin[]>;

    items: TCoin[] = [];

    diffObj: TCoinDiff = {};

    constructor() {
        // makeAutoObservable(this);
        makeObservable(this, {
            items: observable,
            diffObj: observable,
        });
    }

    setItems = (items: TCoin[]): void => {
        this.diffObj =
            this.diffPriceCoins(this.items, items).length === 0
                ? (this.diffObj = this.diffObj)
                : this.diffPriceCoins(this.items, items).reduce((initObj: TCoinDiff, obj: TCoin) => {
                      const newObj: TCoin = items.find((item: { name: string }) => item.name === obj.name) || obj;
                      const oldObj: TCoin = this.items.find((itemObj) => itemObj.name === newObj.name) || newObj;
                      const color: string = newObj.price === oldObj.price ? '' : newObj.price > oldObj.price ? '#3d9400' : '#A11B0A';
                      initObj[newObj.name] = color;
                      return initObj;
                  }, {});
        this.items = items as TCoin[];
    };

    /*  fetchCoins() {
        axios.get(`https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD`).then(({ data }) => {
            console.log('fetchCoins: ');

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
            // this.setItems(coins);
        });
    } */

    diffPriceCoins(arr1: TCoin[], arr2: TCoin[]) {
        return arr1.filter((item, index) => item.price !== arr2[index].price);
    }

    getCoins = () => {
        console.log('getCoins: ');
        // this.setItems(await fetchCoins());
        /*  this.setItems(
            fromPromise(fetchCoins()).case({
                fulfilled: (data) => {
                    console.log('data: ', data);
                    return data;
                },
            }),
        ); */
        // this.fetchCoins();
        this.data = fromPromise(fetchCoins());
        this.data.then((data) => {
            this.setItems(data);
            // return data;
        });

        // const coins: TCoin[] = (await this.data.then((data) => data)) as unknown as TCoin[];
        //this.setItems(this.data?.value as unknown as TCoin[]);
    };
}

//export default CurrenciesStore;
export const currenciesStore = new CurrenciesStore();
