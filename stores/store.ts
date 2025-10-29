import { defineStore } from 'pinia'

// Types
import type ProductModel from '../types/product/product';
import type PriceModel from '../types/price';
import type InventoryEntryModel from '../types/product/inventoryEntry';

export const useMainStore = defineStore('main', {

    // Globally available fields
    state: () => ({
        apiBaseurl: '',
        xApiKey: '',

        // This field will represent the current state of loading for the entire site
        hasLoaded: false,
        currentPage: {
            pageData: {
                currentProduct: {
                    id: "12345678",
                    name: "Gum Duck",
                    description: "Description explaining product and how it works with some extra description here and there and gum duck and duck gum and gum duck gum",
                    imagePath: "data:image/webp;base64,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",
                    price: {
                        currencySymbol: "DKK",
                        formattedPrice: "100 DKK",
                        amount: 100,
                    } as PriceModel,
                    slug: "Gum Duck",
                    inventory: [
                        {
                            productId: "12345678",
                            locationId: "87654321",
                            available: 10,
                            reserved: 1
                        } as InventoryEntryModel
                    ] as InventoryEntryModel[],
                } as ProductModel
            } as any,
        } as any,
        siteProducts: [] as ProductModel[],
    }),

    // Globally available functions
    actions: {
        setConfig(runtimeConfig: any) {
            this.apiBaseurl = runtimeConfig.apiBaseurl;
            this.xApiKey = runtimeConfig.xApiKey;
        },
    },
})