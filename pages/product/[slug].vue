<template>
  <div v-if="store?.currentPage?.pageData" id="product-page"
    class="product container narrow pl-[1em] pr-[1em] overflow-hidden medium:max-w-[92%] xlarge:!max-w-[1600px]">
    <div class="flex flex-col medium:flex-row justify-center align-center medium:mt-[2rem]">
      <!-- <img>This is an image</img> -->

      <div class="controls flex flex-col break-words medium:ml-[1rem] overflow:hidden">
        <!-- <Breadcrumbs v-if="store.currentPage.pageData.hasLoaded" :breadcrumbs="store.breadcrumbs"></Breadcrumbs> -->

        <div class="my-[1.2em]">
          <!-- <InventoryStock v-if="store.hasLoaded" :product="store.currentProduct"></InventoryStock> -->

          <Price v-if="store.hasLoaded" :price="store?.currentPage?.pageData?.currentProduct.price"></Price>
        </div>

        <button v-if="!isButtonDisabled" class="actionBtn add"
            @click="mainButtonClick()">
            Add to cart
        </button>
        <button v-else class="actionBtn notInStock"
            :disabled="true">
            Not in stock
        </button>
      </div>
    </div>

    <!-- <LoadingSymbolFixed v-if="store.isFetchingCart" class="w-[6rem]">
    </LoadingSymbolFixed> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMainStore } from '../../stores/store';

// Components
import Price from '../../components/product/Price.vue';

export default defineComponent({
  name: 'ProductPage',
  components: { Price },
  setup() {
    const store = useMainStore()

    return { store }
  },
})
</script>