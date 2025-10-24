<template>
  <div class="bg-white rounded-lg shadow-md p-6 text-center">
    <img v-if="image" :src="image" alt="Team member photo" class="w-32 h-32 mx-auto rounded-full mb-4 object-cover" />
    <h3 class="text-xl font-semibold text-gray-800">{{ name }}</h3>
    <p class="text-gray-600">{{ role }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  role: string
  image: string | null
}>()
</script>