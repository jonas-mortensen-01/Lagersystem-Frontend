import type PriceModel from '../price';
import type InventoryEntryModel from './inventoryEntry';

export default interface Product {
    id: string;
    name: string;
    description: string;
    imagePath: string;
    price: PriceModel;
    slug?: string;
    inventory?: InventoryEntryModel[];
}