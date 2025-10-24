<template>
  <div class="container mx-auto p-6">
    <!-- Header + Search + Add -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Products</h1>

      <div class="flex space-x-3">
        <!-- Search Input -->
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Search products..."
          class="border rounded-lg p-2 focus:ring focus:ring-blue-300"
        />

        <!-- Add Product Button -->
        <button
          @click="openCreateModal"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          + Add Product
        </button>
      </div>
    </div>

    <!-- Product List -->
    <div
      v-if="visibleProducts.length"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div
        v-for="product in visibleProducts"
        :key="product.id"
        @click="openEditModal(product)"
        class="flex justify-between bg-white shadow-lg rounded-lg p-4 cursor-pointer hover:ring hover:ring-blue-300 transition"
      >
        <div class="mr-[4px]">
          <h3 class="text-lg font-semibold mb-1">{{ product.name }}</h3>
          <p class="text-gray-600 text-sm mb-2 line-clamp-2">{{ product.description }}</p>
          <p class="text-green-700 font-semibold">
            {{ product.price.amount }} {{ product.price.currencySymbol }}
          </p>
        </div>
        <img
          v-if="product.imagePath"
          :src="product.imagePath"
          alt="Product image"
          class="h-20 object-cover rounded-lg mb-3"
        />
      </div>
    </div>

    <p v-else-if="searchTerm === ''" class="text-gray-500 text-center mt-12">
      No products found. Create one to get started!
    </p>

    <p v-else class="text-gray-500 text-center mt-12">
      No products found for "{{ searchTerm }}"
    </p>

    <!-- Pagination Controls -->
    <div
      v-if="totalPages > 1"
      class="flex justify-center items-center mt-6 space-x-4"
    >
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

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white w-[90%] max-w-lg rounded-lg shadow-lg p-6 relative">
        <button
          class="absolute top-3 right-3 text-gray-500 hover:text-black"
          @click="closeModal"
        >
          ✕
        </button>

        <h2 class="text-xl font-semibold mb-4">
          {{ editingProduct ? 'Edit Product' : 'Create Product' }}
        </h2>

        <!-- Scrollable Form -->
        <div class="max-h-[80vh] overflow-y-auto pr-2">
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <!-- Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                v-model="form.name"
                type="text"
                class="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
                required
              />
            </div>

            <!-- Description -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                v-model="form.description"
                class="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
                required
              />
            </div>

            <!-- Image -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                v-model="form.imagePath"
                type="text"
                placeholder="https://example.com/image.jpg"
                class="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
              />
              <div v-if="form.imagePath" class="mt-2">
                <img
                  :src="form.imagePath"
                  alt="Preview"
                  class="w-32 h-32 object-cover rounded-lg border"
                />
              </div>
            </div>

            <!-- Amount -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Amount (DKK)</label>
              <input
                v-model.number="form.amount"
                type="number"
                step="0.01"
                min="0"
                class="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
                required
              />
            </div>

            <!-- Buttons -->
            <div class="flex justify-between mt-4">
              <button
                type="submit"
                class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                {{ editingProduct ? 'Update' : 'Create' }}
              </button>

              <button
                v-if="editingProduct"
                type="button"
                @click="deleteCurrentProduct"
                class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted } from 'vue'
import { useMainStore } from '../../../stores/store'

// Types
import type ProductModel from '~/types/product/product'

const store = useMainStore()

// Modal & form
const showModal = ref(false)
const editingProduct = ref<ProductModel | null>(null)
const searchTerm = ref('')
const currentPage = ref(1)
const itemsPerPage = 32

const form = reactive({
  name: '',
  description: '',
  amount: 0,
  imagePath: ''
})

// --- Combined computed for filtering + pagination ---
const visibleProducts = computed(() => {
  const term = searchTerm.value.toLowerCase().trim()
  let filtered = store.currentPage.pageData?.products || []

  if (term) {
    filtered = filtered.filter((p: any) =>
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      p.imagePath.toLowerCase().includes(term) ||
      p.price.amount.toString().includes(term)
    )
  }

  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filtered.slice(start, end)
})

// Total pages for current search
const totalPages = computed(() => {
  const term = searchTerm.value.toLowerCase().trim()
  const filteredCount = store.currentPage.pageData?.products?.filter((p: any) =>
    term
      ? p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.imagePath.toLowerCase().includes(term) ||
        p.price.amount.toString().includes(term)
      : true
  ).length || 0

  return Math.max(1, Math.ceil(filteredCount / itemsPerPage))
})

// --- Pagination ---
const goToPreviousPage = () => {
  if (currentPage.value > 1) currentPage.value--
}
const goToNextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

// Reset page when search term changes
watch(searchTerm, () => {
  currentPage.value = 1
})

// --- Modal handlers ---
const openCreateModal = () => {
  editingProduct.value = null
  resetForm()
  showModal.value = true
}
const openEditModal = (product: ProductModel) => {
  editingProduct.value = product
  form.name = product.name
  form.description = product.description
  form.amount = product.price.amount
  form.imagePath = product.imagePath
  showModal.value = true
}
const closeModal = () => { showModal.value = false }

// --- CRUD handlers ---
const handleSubmit = () => {
  if (editingProduct.value) {
    editingProduct.value.name = form.name
    editingProduct.value.description = form.description
    editingProduct.value.price.amount = form.amount
    editingProduct.value.price.currencySymbol = 'DKK'
    editingProduct.value.imagePath = form.imagePath
  } else {
    const newProduct: ProductModel = {
      id: crypto.randomUUID(),
      name: form.name,
      description: form.description,
      imagePath: form.imagePath,
      price: { amount: form.amount, formattedPrice: '', currencySymbol: 'DKK' }
    }
    if (!store.currentPage.pageData.products) store.currentPage.pageData.products = []
    store.currentPage.pageData.products.push(newProduct)
  }
  closeModal()
}

const deleteCurrentProduct = () => {
  if (!editingProduct.value) return
  const index = store.currentPage.pageData.products.findIndex(
    (p: ProductModel) => p.id === editingProduct.value!.id
  )
  if (index !== -1) store.currentPage.pageData.products.splice(index, 1)
  closeModal()
}

// --- Helpers ---
const resetForm = () => {
  form.name = ''
  form.description = ''
  form.amount = 0
  form.imagePath = ''
}

onMounted(() => {
  if (!store.currentPage.pageData) store.currentPage.pageData = { products: [] }
})
</script>

<style scoped>
.container {
  max-width: 1000px;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
