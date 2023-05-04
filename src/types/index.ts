export type TCoin = {
    id: string;
    name: string;
    fullName: string;
    imageUrl: string;
    price: string;
    volume24hour: string;
};

export type TCoinDiff = {
    [key: string]: string;
};
