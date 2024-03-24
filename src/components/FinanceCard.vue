<script setup lang="ts">
import { Doughnut } from 'vue-chartjs'
import { data, options } from '@/config/doughnutChart'

const { total, churnTotal, backgroundChart } = defineProps([
  'total',
  'churnTotal',
  'backgroundChart'
])

data.value.datasets[0].backgroundColor = backgroundChart
data.value.datasets[0].data.push(total, churnTotal)
</script>

<template>
  <div class="p-4 2xl:p-8 rounded-2xl w-full flex justify-center gap-10">
    <div class="flex flex-col justify-center items-center">
      <span class="flex text-lg text-white"><slot name="text-total"></slot></span>
      <span class="flex text-3xl text-white font-bold"><slot name="total"></slot></span>
    </div>
    <div class="flex items-center">
      <Doughnut
        v-if="total > 0 && churnTotal > 0"
        style="height: 150px; width: 150px"
        :data="data"
        :options="options"
      />
      <div v-else class="text-base text-white">Nenhum dado encontrado.</div>
    </div>
  </div>
</template>

<style scoped></style>
