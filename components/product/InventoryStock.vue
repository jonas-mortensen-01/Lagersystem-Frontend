<template>
    <div class="text-xl">
        <div>
            <p v-if="inventory != null && inventory > 0" class="text-green-700 font-bold">{{ inventory }} in stock</p>
            <p v-else class="text-red-700">Not in stock</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'InventoryStock',
  props: {
    inventory: {
      type: Object as () => number,
      required: true
    }
  }
})
</script>