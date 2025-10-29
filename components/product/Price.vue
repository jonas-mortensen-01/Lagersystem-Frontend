<template>
    <div v-if="price" class="text-xl">
        <div>
            <p class="font-semibold">{{ price.formattedPrice }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Types
import type PriceModel from '../../types/price'

export default defineComponent({
  name: 'Price',
  props: {
    price: {
      type: Object as () => PriceModel,
      required: true
    }
  }
})
</script>