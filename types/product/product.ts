import type PriceModel from '../price';

export default interface Product {
    id: string;
    name: string;
    description: string;
    imagePath: string;
    price: PriceModel;
    slug?: string;
}