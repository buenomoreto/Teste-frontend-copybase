<script setup lang="ts">
import { ref } from 'vue'
import { Status } from '@/types/enum/status'
import moment from 'moment'
import Sidebar from '@/components/SideBar.vue'
import FinanceCard from '@/components/FinanceCard.vue'
import ChartBar from '@/components/ChartBar.vue'
import ListBillings from '@/components/ListBillings.vue'
import Pagination from '@/components/Pagination.vue'
import AboutCompany from '@/components/AboutCompany.vue'
import ProfitCard from '@/components/ProfitCard.vue'
import useService from '@/composables/useService'
import { useCurrencyFormatter } from '@/composables/useCurrencyFormatter'

const { getMetrics, getBillings } = useService()
const metrics = ref()
const listing = ref()
const currentPage = ref(1)
const currentStatus = ref()
const currentDate = moment().startOf('day').utc().format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]')
const lastMonth = moment(currentDate)
  .endOf('year')
  .subtract(1, 'months')
  .utc()
  .format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]')

const range = ref({
  start: currentDate,
  end: lastMonth
})

const attrs = {
  highlight: {
    start: {
      style: {
        backgroundColor: '#57E140'
      },
      contentStyle: {
        color: '#ffffff'
      }
    },
    base: {
      style: {
        backgroundColor: '#fff'
      }
    },
    end: {
      style: {
        backgroundColor: '#57E140'
      },
      contentStyle: {
        color: '#ffffff'
      }
    }
  }
}

async function fetchMetric() {
  metrics.value = await getMetrics(currentDate, lastMonth)
}

async function fetchListing() {
  const page = 1
  listing.value = await getBillings(page)
}

async function handlePage(page: number) {
  currentPage.value = page
  listing.value = await getBillings(currentPage.value, currentStatus.value)
}

async function handleStatus(status: Status) {
  currentStatus.value = status
  listing.value = await getBillings(currentPage.value, status)
}
async function handleDate() {
  metrics.value = await getMetrics(
    moment(range.value.start).utc().format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]'),
    moment(range.value.end).utc().format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]')
  )
}

fetchMetric()
fetchListing()
</script>

<template>
  <main class="p-7 h-full flex gap-8">
    <div>
      <Sidebar v-motion-fade :delay="300" />
      <div
        class="bg-primary-50 rounded-2xl text-white py-6 px-4"
        v-motion-slide-bottom
        :delay="300"
      >
        <div
          class="p-4 rounded-lg shadow-md"
          style="
            background: linear-gradient(90deg, rgba(48, 123, 35, 1) 0%, rgba(87, 225, 64, 1) 100%);
          "
        >
          <h2 class="text-2xl font-bold text-white mb-4">Filtrar por Data</h2>
          <div class="flex flex-col">
            <div class="mb-2">
              <span class="font-semibold">Data de Início:</span>
              <span class="ml-2">{{ moment(range.start).utc().format('DD-MM-YYYY') }}</span>
            </div>
            <div>
              <span class="font-semibold">Data Final:</span>
              <span class="ml-2">{{ moment(range.end).utc().format('DD-MM-YYYY') }}</span>
            </div>
          </div>
        </div>

        <VDatePicker
          v-model.range="range"
          @dayclick="handleDate"
          :first-day-of-week="1"
          title-position="left"
          :masks="{ weekdays: 'WWW' }"
          :select-attribute="attrs"
          :drag-attribute="attrs"
        />
      </div>
    </div>
    <div class="w-full">
      <div class="flex gap-8 w-full mb-10">
        <FinanceCard
          v-motion-slide-left
          v-if="metrics"
          :key="metrics"
          :total="metrics.total"
          :churn-total="metrics.churn.total"
          :background-chart="['#307B23', '#B2EDA8']"
          style="
            background: linear-gradient(80deg, rgba(48, 123, 35, 1) 0%, rgba(87, 225, 64, 1) 100%);
          "
        >
          <template #text-total> Total MRR </template>
          <template #total>
            {{ useCurrencyFormatter(metrics.total).value }}
          </template>
        </FinanceCard>
        <FinanceCard
          v-motion-slide-right
          :delay="300"
          v-if="metrics"
          :key="metrics"
          :total="metrics.total"
          :churn-total="metrics.churn.total"
          :background-chart="['#B2EDA8', '#307B23']"
          style="
            background: linear-gradient(270deg, rgba(48, 123, 35, 1) 0%, rgba(87, 225, 64, 1) 100%);
          "
        >
          <template #text-total> Total Churn Rate </template>
          <template #total>
            {{ useCurrencyFormatter(metrics.churn.total).value }}
          </template>
        </FinanceCard>
      </div>
      <ChartBar
        v-motion-slide-top
        :delay="300"
        v-if="metrics && metrics.records"
        :records="metrics.records"
        :key="metrics"
      />
      <ListBillings
        v-motion-slide-top
        :delay="300"
        v-if="listing"
        :billings="listing.billings"
        @status="handleStatus"
      />
      <Pagination
        v-if="listing && listing.billings.length"
        :key="listing.billings"
        :items-per-page="listing.itemsPerPage"
        :total="listing.total"
        :page="currentPage"
        @page="handlePage"
      />
    </div>
    <div v-motion-slide-bottom :delay="300">
      <AboutCompany />
      <ProfitCard v-if="metrics" :churn="metrics.churn.total" :mrr="metrics.total" />
    </div>
  </main>
</template>
<style scoped></style>
