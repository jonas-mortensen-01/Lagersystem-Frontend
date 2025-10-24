<template>
    <div v-if="price" class="mt-[.5em]">
        <div>
            <p>{{ price.formattedPrice }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useMainStore } from '../../stores/store';

// Types
import type PriceModel from '../../types/price'

export default defineComponent({
  name: 'Price',
  props: {
    price: {
      type: Object as () => PriceModel, // TypeScript type
      required: true
    }
  },
  setup() {
    const store = useMainStore()

    return { store }
  },
})
</script>