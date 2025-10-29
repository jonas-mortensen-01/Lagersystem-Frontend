<template>
  <header class="bg-blue-600 text-white py-3 shadow-md">
    <div class="flex container mx-auto flex flex-col justify-between px-4">
      <!-- Main site title -->
      <div class="flex justify-between items-center md:text-left mb-4 md:mb-0">
        <nuxt-link
          to="/"
          class="hover:underline text-white px-4 py-2 rounded-lg transition text-sm"
        >
            <h1 class="text-3xl font-bold">Warehouse site</h1>
        </nuxt-link>

        <nuxt-link
          to="/search"
          class="hover:underline text-white px-[1rem] rounded-lg transition text-sm"
        >
            Search
        </nuxt-link>
      </div>

      <!-- Admin products link -->
      <div>
        <nuxt-link
          to="/admin/product"
          class="hover:underline text-white px-4 py-2 rounded-lg transition text-sm"
        >
          Admin Products
        </nuxt-link>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// No script needed for static header
</script>

<style scoped>
/* Optional: subtle shadow or gradient for nicer look */
</style>
