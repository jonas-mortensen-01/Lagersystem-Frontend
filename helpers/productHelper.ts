// Helpers
import PriceHelper from './priceHelper';

// Types
import type ProductModel from '../types/product/product';

export default class ProductHelper {
    priceHelper: PriceHelper = new PriceHelper;

    mapProductModelListFromResponse(data: any): ProductModel[] {
        let result: ProductModel[] = [];

        data.forEach((item: any) => {
            var product = this.mapProductModelFromResponse(data);
            if (product) {
                result.push(product);
            }
        });

        return result;
    }

    mapProductModelFromResponse(data: any): ProductModel {
        let product: ProductModel = {} as ProductModel;

        if (data) {
            product = {
                id: data.id ?? "",
                name: data.name ?? "",
                description: data.description ?? "",
                price: this.priceHelper.mapPrice(data.price),  
            } as ProductModel
        }

        return product;
    }
}