import { defineStore } from 'pinia'

// Types
import type ProductModel from '../types/product/product';

export const useMainStore = defineStore('main', {
    
    // Globally available fields
    state: () => ({
        apiBaseurl: '',
        xApiKey: '',

        // This field will represent the current state of loading for the entire site
        hasLoaded: false,
        currentPage: {} as any,
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