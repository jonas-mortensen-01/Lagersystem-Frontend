// Types
import type ProductModel from '../types/product/product'
import type InventoryEntryModel from '../types/product/inventoryEntry';

export default class InventoryHelper {
    getStockFromProduct(product: ProductModel): number {
        if (product != null) {
            var result = 0;

            product.inventory?.forEach((entry: InventoryEntryModel) => {
                var stock = this.getStockFromEntry(entry);
                result += stock;
            });

            return result;
        }

        return 0;
    }

    getStockFromEntry(entry: InventoryEntryModel): number {
        if (entry != null) {
            var result = entry.available - entry.reserved;
            return result;
        }

        return 0;
    }
}