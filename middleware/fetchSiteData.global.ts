import { useMainStore } from '../stores/store';

// Services
import ProductService from '../services/productService';

export default defineNuxtRouteMiddleware(async (to: any) => {
    var productService = new ProductService;

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

        var products = await productService.getProducts();
        store.siteProducts = products;
        console.log("products", products)
    }
});