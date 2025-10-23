import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
    // Globally available fields
    state: () => ({
        user: "stuff user",
    }),

    // Globally available functions
    actions: {
        // Examples
        // setUser(userData: { name: string; email: string }) {
        //   this.user = userData
        // },
        // setTheme(theme: 'light' | 'dark') {
        //   this.theme = theme
        // },
    },
})