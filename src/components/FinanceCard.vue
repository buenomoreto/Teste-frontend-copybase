<script setup lang="ts">
import { Doughnut } from 'vue-chartjs'
import { options } from '@/config/doughnutChart'
import { watchEffect, ref } from 'vue'

const props = defineProps(['backgroundChart', 'metrics'])

const data = ref({
  datasets: [
    {
      backgroundColor: props.backgroundChart,
      data: [props.metrics.total, props.metrics.churn.total]
    }
  ]
})

watchEffect(() => {
  data.value.datasets[0].backgroundColor = props.backgroundChart
  data.value.datasets[0].data = [props.metrics.total, props.metrics.churn.total]
})
</script>

<template>
  <div class="p-4 2xl:p-8 rounded-2xl w-full flex justify-center gap-10 flex-wrap sm:flex-nowrap">
    <div class="flex flex-col justify-center items-center">
      <span class="flex text-lg text-white"><slot name="text-total"></slot></span>
      <span class="flex text-3xl text-white font-bold"><slot name="total"></slot></span>
    </div>
    <div class="flex items-center">
      <Doughnut
        v-if="props.metrics.total > 0 && props.metrics.churn.total > 0"
        style="height: 150px; width: 150px"
        :data="data"
        :options="options"
      />
      <div v-else class="text-base text-white">Nenhum dado encontrado.</div>
    </div>
  </div>
</template>

<style scoped></style>
