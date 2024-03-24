<script lang="ts" setup>
import { Bar } from 'vue-chartjs'
import { Records } from '@/types/interface/records'
import { data, options } from '@/config/chartBar'

const { records } = defineProps(['records'])

data.value.labels = records.map((item: Records) => item.month.label)
data.value.datasets[0].data = records.map((item: Records) => item.mrr.total)
data.value.datasets[1].data = records.map((item: Records) => item.churn.total)
</script>

<template>
  <div class="bg-primary-50 p-4 2xl:p-8 rounded-2xl mb-8 flex flex-col">
    <h1 class="text-xl text-white mb-6">Métricas MRR & Churn range</h1>
    <Bar :data="data" :options="options" v-if="records.length" />
    <div v-else class="text-base text-white">Nenhum dado encontrado.</div>
  </div>
</template>
