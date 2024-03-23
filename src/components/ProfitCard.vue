<script setup lang="ts">
import { useCurrencyFormatter } from '@/composables/useCurrencyFormatter'
import { computed } from 'vue'

const props = defineProps(['mrr', 'churn'])
const total = computed(() => {
  return props.mrr - props.churn
})
</script>
<template>
  <section
    class="bg-primary-50 rounded-2xl text-white py-6 max-w-[400px] w-full px-6 flex justify-center gap-10"
  >
    <div class="text-lg text-white">Lucros</div>
    <div class="text-lg text-primary-300 font-bold">
      {{ useCurrencyFormatter(total).value || 'R$ 0,00' }}
    </div>
  </section>
</template>
<style scoped></style>
