// Types
import type PriceModel from '../types/price';

export default class PriceHelper {
    mapPrice(data: any): PriceModel {
        let price: PriceModel = {} as PriceModel;

        if (data) {
            price = {
                currencySymbol: "DKK",
                formattedPrice: "",
                amount: data.amount,
            } as PriceModel
        }

        price.formattedPrice = this.mapFormattedPrice(price.amount ? price.amount.toString() : "0", price.currencySymbol);

        return price;
    }

    mapFormattedPrice(amount: string, currencySymbol: string) {
        return amount += " " + currencySymbol;
    }
}