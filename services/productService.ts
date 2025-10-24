import axios from 'axios';

// Helpers
import ProductHelper from '../helpers/productHelper';

// Types
import type ProductModel from '../types/product/product';

export default class ProductService {
    store: any = useMainStore();

    // Helpers
    productHelper: ProductHelper = new ProductHelper;

    async getProducts(productId?: string): Promise<Array<any>> {
        try {
            const response = await axios.get<Array<any>>(`${this.store.apiBaseurl}/product/someplacetofetchit`, {
                params: {
                    id: JSON.stringify(productId)
                },
                headers: {
                    'Content-Type': 'application/json',
                    // 'X-API-Key': this.store.xApiKey
                }
            });

            if (response.data) {
                return this.productHelper.mapProductModelListFromResponse(response.data)
            }

            return response.data;
        } catch (error) {
            throw new Error('Error getting products by ids: ' + error);
        }
    }

    async createProduct(payload: {
        name: string
        description: string
        amount: number
        imagePath: string
    }): Promise<ProductModel> {
        try {
            const formattedPayload = {
                name: payload.name,
                description: payload.description,
                amount: payload.amount,
                imagePath: payload.imagePath
            }

            const response = await axios.post(
                `${this.store.apiBaseurl}/product`,
                formattedPayload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        // 'X-API-Key': this.store.xApiKey
                    }
                }
            )

            return this.productHelper.mapProductModelFromResponse(response.data)
        } catch (error: any) {
            console.error('Error creating product:', error)
            throw new Error('Error creating product: ' + error.message)
        }
    }

    async updateProduct(productId: string, payload: {
        name?: string
        description?: string
        amount?: number
        imagePath?: string
    }): Promise<ProductModel> {
        try {
            const formattedPayload: any = {
                ...payload,
            }

            const response = await axios.put(
                `${this.store.apiBaseurl}/product/${productId}`,
                formattedPayload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        // 'X-API-Key': this.store.xApiKey
                    }
                }
            )

            return this.productHelper.mapProductModelFromResponse(response.data)
        } catch (error: any) {
            console.error('Error updating product:', error)
            throw new Error('Error updating product: ' + error.message)
        }
    }

    async deleteProduct(productId: string): Promise<boolean> {
        try {
            await axios.delete(`${this.store.apiBaseurl}/product/${productId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    // 'X-API-Key': this.store.xApiKey
                }
            })

            return true
        } catch (error: any) {
            console.error('Error deleting product:', error)
            throw new Error('Error deleting product: ' + error.message)
        }
    }
}