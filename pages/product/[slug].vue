<template>
  <div
    v-if="store?.currentPage?.pageData"
    id="product-page"
    class="product container mx-auto px-4 py-6 overflow-hidden max-w-[1400px] w-[65%] mt-[2rem]"
  >
    <!-- Grid layout: Image left, info right -->
    <div class="flex justify-center items-center gap-8 items-start">
      <!-- 🖼️ Product Image -->
      <div>
        <img
          v-if="store?.currentPage?.pageData?.currentProduct?.imagePath"
          :src="store.currentPage.pageData.currentProduct.imagePath"
          alt="Product image"
          class="w-full h-auto min-h-[250px] max-h-[500px] object-contain rounded-xl shadow-md"
        />
      </div>

      <!-- 🧾 Product Info -->
      <div class="space-y-4">
        <!-- Product ID + Name -->
        <div>
          <p class="text-gray-500 text-sm mb-1">
            ID: {{ store.currentPage.pageData.currentProduct.id }}
          </p>
          <h1 class="text-2xl font-semibold text-gray-800">
            {{ store.currentPage.pageData.currentProduct.name }}
          </h1>
        </div>

        <!-- Price + Stock -->
        <div>
          <InventoryStock
            v-if="store?.currentPage?.pageData?.currentProduct"
            :inventory="inventoryHelper.getStockFromProduct(store.currentPage.pageData.currentProduct)"
          />
          <Price
            v-if="store?.currentPage?.pageData?.currentProduct?.price"
            :price="store.currentPage.pageData.currentProduct.price"
          />
        </div>

        <!-- Action Buttons -->
        <div>
          <button
            v-if="store?.currentPage?.pageData?.currentProduct?.inventory && inventoryHelper.getStockFromProduct(store?.currentPage?.pageData?.currentProduct)"
            class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition-all duration-200"
            @click="addToCart()"
          >
            Add to cart
          </button>
          <button
            v-else
            class="px-6 py-2 bg-gray-400 text-white font-medium rounded-lg cursor-not-allowed"
            disabled
          >
            Not in stock
          </button>
        </div>
      </div>
    </div>

    <!-- 📝 Product Description -->
    <div class="mt-10 text-gray-700 leading-relaxed border-t pt-6">
      <h2 class="text-xl font-semibold mb-3">Description</h2>
      <p>{{ store.currentPage.pageData.currentProduct.description }}</p>
    </div>
  </div>
</template>


<script setup lang="ts">
import { useMainStore } from '../../stores/store';

// Components
import Price from '../../components/product/Price.vue';
import InventoryStock from '../../components/product/InventoryStock.vue';

// Helpers
import InventoryHelper from '../../helpers/inventoryHelper';

const store = useMainStore();

const inventoryHelper = new InventoryHelper();

function addToCart() {
  console.log("test add to cart");
}
</script>