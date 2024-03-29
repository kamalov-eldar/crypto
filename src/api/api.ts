import axios from 'axios';
import { IMessage, TCoin } from '../types';

export const fetchCoins = axios.get(`https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD`).then(({ data }) => {

    const coins: TCoin[] = data.Data.map((coin: any) => {
        return {
            id: coin.CoinInfo.Id,
            name: coin.CoinInfo.Name,
            fullName: coin.CoinInfo.FullName,
            imageUrl: `https://www.cryptocompare.com/${coin.CoinInfo.ImageUrl}`,
            price: coin.RAW.USD.PRICE,
            volume24hour: coin.DISPLAY.USD.VOLUME24HOUR,
            changeday: coin.DISPLAY.USD.CHANGEDAY,
        };
    });
    return coins;
});

export const fetchTick = (arrCoinsName: string[]) =>
    axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${arrCoinsName.join(',')}&tsyms=USD`).then(({ data }) => {
        let message: IMessage = {};
        arrCoinsName.forEach((name) => {
            message[name] = { price: data.RAW[name]['USD']['PRICE'] };
        });
        return message;
    });

// 68ff6ac52df0cf4d0fd0518b6bb2c3d51cc7ce9014dbc8e43747ac61c8790615
