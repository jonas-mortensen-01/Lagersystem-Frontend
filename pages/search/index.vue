<template>
  <div class="container mx-auto p-6">
    <!-- Title -->
    <h1 class="text-3xl font-bold mb-6">Search</h1>

    <!-- Search Box -->
    <div class="mb-6">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Search products..."
        class="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
      />
    </div>

    <!-- Product List -->
    <div v-if="paginatedProducts.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductItem
        v-for="product in paginatedProducts"
        :key="product.id"
        :product="product"
      />
    </div>

    <!-- No results -->
    <p v-else-if="searchTerm === ''" class="text-gray-500 text-center mt-12">
      No products available.
    </p>
    <p v-else class="text-gray-500 text-center mt-12">
      No products found for "{{ searchTerm }}"
    </p>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex justify-center items-center mt-6 space-x-4">
      <button
        @click="goToPreviousPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-400"
      >
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        @click="goToNextPage"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-400"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue'
import ProductItem from '../../components/product/ProductItem.vue'
import type ProductModel from '~/types/product/product'

// --- Mock Search Service ---
const searchService = {
  async searchProducts(term: string): Promise<ProductModel[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300))
    const allProducts: ProductModel[] = [
      { id: '1', name: 'Apple', description: 'Red apple', price: { amount: 2, formattedPrice: '', currencySymbol: 'DKK' }, imagePath: '' },
      { id: '2', name: 'Banana', description: 'Yellow banana', price: { amount: 1.5, formattedPrice: '', currencySymbol: 'DKK' }, imagePath: '' },
      { id: '3', name: 'Orange', description: 'Juicy orange', price: { amount: 2, formattedPrice: '', currencySymbol: 'DKK' }, imagePath: '' },
      // ... more sample products
    ]
    if (!term) return allProducts
    const termLower = term.toLowerCase()
    return allProducts.filter(p =>
      p.name.toLowerCase().includes(termLower) ||
      p.description.toLowerCase().includes(termLower) ||
      p.imagePath?.toLowerCase().includes(termLower) ||
      p.price.amount.toString().includes(termLower)
    )
  }
}

// --- Reactive state ---
const foundProducts = ref<ProductModel[]>([])
const searchTerm = ref('')

// Pagination
const currentPage = ref(1)
const itemsPerPage = 24

// --- Computed ---
const totalPages = computed(() => Math.max(1, Math.ceil(foundProducts.value.length / itemsPerPage)))
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return foundProducts.value.slice(start, end)
})

// --- Watchers ---
watch(searchTerm, async (newTerm) => {
  currentPage.value = 1
  foundProducts.value = await searchService.searchProducts(newTerm)
})

// Navigation
const goToPreviousPage = () => { if (currentPage.value > 1) currentPage.value-- }
const goToNextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++ }

// --- Initial load ---
onMounted(async () => {
  foundProducts.value = await searchService.searchProducts('')
})
</script>
