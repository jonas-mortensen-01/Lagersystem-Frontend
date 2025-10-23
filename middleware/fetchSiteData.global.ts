import { useMainStore } from '../stores/store';

export default defineNuxtRouteMiddleware(async (to: any) => {
    if (!to.path || to.path === "/null") {
        console.error("Invalid route detected:", to.path);
        return;
    }
    if (import.meta.server) console.log("started middleware server");
    if (import.meta.client) console.log("started middleware client");

    // Store
    const store: any = useMainStore();

    const config = useRuntimeConfig();

    if (import.meta.server) {
        store.setConfig({
            apiBaseurl: config.apiBaseurl,
            // xApiKey: config.xApiKey,
        });
    }
});