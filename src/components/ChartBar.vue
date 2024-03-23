<script lang="ts" setup>
import { ref } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import { Records } from '@/types/interface/records'

const { records } = defineProps(['records'])

const data = ref({
  labels: [],
  datasets: [
    {
      label: 'MRR',
      backgroundColor: '#57E140',
      data: []
    },
    {
      label: 'Churn Rate',
      backgroundColor: '#307B23',
      data: []
    }
  ]
})

const options = ref({
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        color: '#fff'
      },
      grid: {
        color: '#72767F',
        tickColor: '#fff'
      }
    },
    x: {
      beginAtZero: true,
      ticks: {
        color: '#fff'
      },
      grid: {
        color: 'transparent',
        tickColor: '#fff'
      }
    }
  },
  plugins: {
    subtitle: {
      color: '#fff'
    },
    title: {
      color: '#fff'
    },
    legend: {
      title: {
        color: '#ffff'
      },
      labels: {
        color: '#ffff'
      }
    }
  }
})

data.value.labels = records.map((item: Records) => item.month.label)
data.value.datasets[0].data = records.map((item: Records) => item.mrr.total)
data.value.datasets[1].data = records.map((item: Records) => item.churn.total)

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
</script>
<template>
  <div class="bg-primary-50 p-8 rounded-2xl mb-10 flex flex-col">
    <h1 class="text-xl text-white mb-6">Métricas MRR & Churn range</h1>
    <Bar :data="data" :options="options" v-if="records.length" />
    <div v-else class="text-base text-white">Nenhum dado encontrado.</div>
  </div>
</template>
