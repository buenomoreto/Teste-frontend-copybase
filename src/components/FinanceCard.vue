<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import { ref } from 'vue'

const { churnTotal, total, backgroundChart } = defineProps([
  'total',
  'churnTotal',
  'backgroundChart'
])

const data = ref({
  datasets: [
    {
      backgroundColor: backgroundChart,
      data: [total, churnTotal]
    }
  ]
})

const options = ref({
  responsive: true,
  maintainAspectRatio: false,
  elements: {
    arc: {
      borderWidth: 0
    }
  }
})

ChartJS.register(ArcElement, Tooltip, Legend)
</script>
<template>
  <div class="p-8 rounded-2xl max-w-[600px] w-full flex justify-center gap-10">
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
