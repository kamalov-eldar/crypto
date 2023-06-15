import { ICoinsResponse, TCoin, TChangeColor, IMessage } from '../types';
import { computed, makeAutoObservable, makeObservable, observable } from 'mobx';
import axios, { isCancel, AxiosError } from 'axios';
import { fetchCoins, fetchTick } from '../api/api';
import { IPromiseBasedObservable, fromPromise } from 'mobx-utils';

var apiKey = '68ff6ac52df0cf4d0fd0518b6bb2c3d51cc7ce9014dbc8e43747ac61c8790615';

class CurrenciesStore {
    // data: IPromiseBasedObservable<{ coins: TCoin[]; message: IMessage }> | undefined;
    data = fromPromise<{ coins: TCoin[]; message: IMessage }>(fetchCoins());

    coins: TCoin[] = [];

    message: IMessage = {};

    changeСolor: TChangeColor = {};

    arrCoinsName: string[] = [];

    constructor() {
        makeAutoObservable(this);

        /*  makeObservable(this, {
            items: observable,
            diffObj: observable,
            message: observable,
            strCoinsName: computed,
        }); */
    }

    getCoins = async () => {
        console.log('getCoins: ');
        this.coins = await this.data.then((data) => data.coins);
        this.message = await this.data.then((data) => data.message);
        this.arrCoinsName = await this.data.then((data) => data.coins.map((coin) => coin.name));
    };

    // computed ?
    getColors = (newMessage: IMessage) => {
        const oldMessage = this.message;
        Object.keys(oldMessage).forEach((coinName) => {
            const oldPrice = oldMessage[coinName]['price'];
            const newPrice = newMessage[coinName]['price'];
            const color: string = newPrice === oldPrice ? '#F5F5F5' : newPrice > oldPrice ? '#3d9400' : '#A11B0A';
            this.changeСolor[coinName] = color;
        });
        this.message = newMessage;
    };

    // action/autoAction
    getTickCoins = () => {
        if (this.arrCoinsName) {
            fetchTick(this.arrCoinsName).then((newMessage) => {
                this.getColors(newMessage);
                // this.colors(newMessage).get();
            });
        }
    };
}

//export default CurrenciesStore;
export const currenciesStore = new CurrenciesStore();

/*  setItems = (items: TCoin[]): void => {
        this.changeСolor =
            this.diffPriceCoins(this.coins, items).length === 0
                ? (this.changeСolor = this.changeСolor)
                : this.diffPriceCoins(this.coins, items).reduce((initObj: TChangeColor, obj: TCoin) => {
                      const newObj: TCoin = items.find((item: { name: string }) => item.name === obj.name) || obj;
                      const oldObj: TCoin = this.coins.find((itemObj) => itemObj.name === newObj.name) || newObj;
                      const color: string = newObj.price === oldObj.price ? '' : newObj.price > oldObj.price ? '#3d9400' : '#A11B0A';
                      initObj[newObj.name] = color;
                      return initObj;
                  }, {});
        this.coins = items;
    };

    diffPriceCoins(arr1: TCoin[], arr2: TCoin[]) {
        return arr1.filter((item, index) => item.price !== arr2[index].price);
    }
*/

/*  openWS = () => {
        const wsChanel = new WebSocket('wss://streamer.cryptocompare.com/v2?api_key=' + apiKey);
        wsChanel.onopen = function onStreamOpen() {
            var subRequest = {
                action: 'SubAdd',
                subs: ['2~Coinbase~BTC~USD'],
            };
            // wsChanel.send(JSON.stringify(subRequest));
        };

        wsChanel.onmessage = function onStreamMessage(evt) {
            const obj = JSON.parse(evt.data);
            const message: TMessage = { type: Number(obj.TYPE), price: Number(obj.PRICE), flags: Number(obj.FLAGS) };
            if (message.type === 2) {
                currenciesStore.message = message;
            }
            if (message.type === 429) {
                console.log('SubRemove');
                var subRequest = {
                    action: 'SubRemove',
                    subs: ['2~Coinbase~BTC~USD'],
                };
                // wsChanel.send(JSON.stringify(subRequest));
                wsChanel.close();

                // wsChanel.close();
            }
            // console.log('Received from Cryptocompare: ' + JSON.parse(message.data));
        };
    };*/
