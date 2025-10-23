<template>
    <div class="pt-[40px]">
        Stuff products ?

        {{  store.user }}
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMainStore } from '../../stores/store';

export default defineComponent({
  name: 'ProductPage',
  setup() {
    const store = useMainStore()

    return { store }
  },
})
</script>