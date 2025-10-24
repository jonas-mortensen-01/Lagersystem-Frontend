import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
    
    // Globally available fields
    state: () => ({
        apiBaseurl: '',
        xApiKey: '',

        // This field will represent the current state of loading for the entire site
        hasLoaded: false,
        currentPage: {} as any,
    }),

    // Globally available functions
    actions: {
       setConfig(runtimeConfig: any) {
        this.apiBaseurl = runtimeConfig.apiBaseurl;
        this.xApiKey = runtimeConfig.xApiKey;
        },
    },
})