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
            const response = await axios.get<Array<any>>(`${this.store.apiBaseurl}/products`, {
                params: {
                    id: JSON.stringify(productId)
                },
                headers: {
                    'Content-Type': 'application/json',
                    // 'X-API-Key': this.store.xApiKey
                }
            });

            if (response.data) {
                var mappedData = this.productHelper.mapProductModelListFromResponse(response.data)

                console.log("data from products", mappedData);

                return mappedData
            }

            return response.data;
        } catch (error) {
            throw new Error('Error getting products: ' + error);
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
                price: payload.amount,
                imagePath: payload.imagePath
            }

            const response = await axios.post(
                `${this.store.apiBaseurl}/products`,
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
        price?: number
        imagePath?: string
    }): Promise<ProductModel> {
        try {
            // Include the product ID in the body
            const requestBody = {
                id: productId,
                ...payload
            }

            const response = await axios.patch(
                `${this.store.apiBaseurl}/products`, // no ID in URL
                requestBody,
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
            await axios.delete(`${this.store.apiBaseurl}/products/${productId}`, {
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