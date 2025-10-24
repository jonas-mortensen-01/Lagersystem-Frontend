<template>
    <nuxt-link to="/product/the actual product page man man">
        <div :key="product.id"
            class="flex justify-between bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:ring hover:ring-blue-300 transition">

            <div class="mr-[4px]">
                <h3 class="text-lg font-semibold mb-1">{{ product.name }}</h3>
                <p class="text-gray-600 text-sm mb-2 line-clamp-2">{{ product.description }}</p>
                <p class="text-green-700 font-semibold">
                    {{ product.price.amount }} {{ product.price.currencySymbol }}
                </p>
            </div>
            <img v-if="product.imagePath" :src="product.imagePath" alt="Product image"
                class="h-20 object-cover rounded-lg mb-3" />
        </div>
    </nuxt-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Types
import type ProductModel from '../../types/product/product'

export default defineComponent({
    name: 'ProductItem',
    props: {
        product: {
            type: Object as () => ProductModel, // TypeScript type
            required: true
        }
    }
})
</script>