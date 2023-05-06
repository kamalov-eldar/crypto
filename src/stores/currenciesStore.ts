import { TCoin, TCoinDiff } from '../types';
import { action, computed, makeAutoObservable, observable } from 'mobx';
import axios, { isCancel, AxiosError } from 'axios';

class CurrenciesStore {
    // @observable private
    items: TCoin[] = [];
    diffObj: TCoinDiff = {};

    constructor() {
        makeAutoObservable(this);
    }

    /* @computed
    get getItems() {
        return this.items;
    } */

    /*  @action
    setItems = (items: TCoin[]): void => {
        this.items = items;
    }; */
    ///@action

    setItems = (items: TCoin[]): void => {
        this.diffObj =
            this.diffPriceCoins(this.items, items).length === 0
                ? (this.diffObj = this.diffObj)
                : this.diffPriceCoins(this.items, items).reduce((initObj: TCoinDiff, obj: TCoin) => {
                      const newObj: TCoin = items.find((item) => item.name === obj.name) || obj;
                      const oldObj: TCoin = this.items.find((itemObj) => itemObj.name === newObj.name) || newObj;
                      const color: string = newObj.price === oldObj.price ? '' : newObj.price > oldObj.price ? '#3d9400' : '#A11B0A';
                      initObj[newObj.name] = color;
                      return initObj;
                  }, {});
        this.items = items;
    };
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
            // this.items = coins;
        });
    }

    diffPriceCoins(arr1: TCoin[], arr2: TCoin[]) {
        return arr1.filter((item, index) => item.price !== arr2[index].price);
    }
}

//export default CurrenciesStore;
export default new CurrenciesStore();
