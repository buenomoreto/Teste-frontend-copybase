import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { ref } from 'vue'

export const data = ref({
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

export const options = ref({
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

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
