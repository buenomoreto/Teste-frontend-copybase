<script lang="ts" setup>
import { Bar } from 'vue-chartjs'
import { Records } from '@/types/interface/records'
import { data, options } from '@/config/chartBar'
import { watchEffect } from 'vue'
import { useDevice } from '@/composables/useDevice'
const { windowSize } = useDevice()
const props = defineProps(['records'])

watchEffect(() => {
  console.log(props.records)

  data.value.labels = props.records.map((item: Records) => item.month.label)
  data.value.datasets[0].data = props.records.map((item: Records) => item.mrr.total)
  data.value.datasets[1].data = props.records.map((item: Records) => item.churn.total)
})
</script>
<template>
  <div class="bg-primary-50 p-4 2xl:p-8 rounded-2xl mb-8 flex flex-col overflow-auto">
    <h1 class="text-xl text-white mb-6">Métricas MRR & Churn range</h1>
    <div class="w-[1180px] overflow-scroll" v-if="windowSize.width < 1024 && records.length">
      <Bar :data="data" :options="options" :key="props.records" />
    </div>
    <div v-else-if="windowSize.width > 1024 && records.length">
      <Bar :data="data" :options="options" :key="props.records" />
    </div>
    <div v-else class="text-base text-white">Nenhum dado encontrado.</div>
  </div>
</template>
