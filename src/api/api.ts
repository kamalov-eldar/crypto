import axios from 'axios';
import { TCoin } from '../types';

export const fetchCoins = async () =>
    await axios.get(`https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD`).then(({ data }) => {
        const coins: TCoin[] = data.Data.map((coin: any) => {
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
        return coins;
    });

/* export const fetchData = async (pageNumber = 1) =>
    (
        await axios.get(
            `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${pageNumber}`,
            {
                headers: {
                    'Content-Type': 'aplication/json',
                    'X-API-KEY': '8ccb0f71-adf6-4b8f-9927-980b4f08e9d5',
                },
            },
        )
    ).data; */
