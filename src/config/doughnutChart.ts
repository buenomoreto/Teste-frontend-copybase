import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { ref } from 'vue'

export const options = ref({
  responsive: true,
  maintainAspectRatio: false,
  elements: {
    arc: {
      borderWidth: 0
    }
  }
})

ChartJS.register(ArcElement, Tooltip, Legend)
