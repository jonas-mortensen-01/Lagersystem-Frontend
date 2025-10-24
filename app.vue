<template>
  <div class="flex flex-col justify-between min-h-[120vh]">
    <div>
      <PageHeader>
        Some header
      </PageHeader>
      <main>
        <NuxtLayout>
          <NuxtPage/>
        </NuxtLayout>
      </main>
    </div>
    <PageFooter>
      Some footer
    </PageFooter>
  </div>
</template>

<script lang="ts">
// Components
import PageHeader from './components/PageHeader.vue';
import PageFooter from './components/PageFooter.vue';

export default defineComponent({
  name: 'HomePage',
  components: { PageHeader, PageFooter },
})
</script>