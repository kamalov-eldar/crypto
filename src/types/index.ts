export type TCoin = {
    id: string;
    name: string;
    fullName: string;
    imageUrl: string;
    price: number;
    volume24hour: string;
    changeday: string;
};

export interface ICoinsResponse {
    Data: TCoin[];
    Message: 'Success';
}

export type TChangeColor = {
    [key: string]: string;
};

export interface IMessage {
    [coinName: string]: {
        price: number;
    };
}
