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
import { Metrics } from '@/types/interface/metrics'
import { Listing } from '@/types/interface/listing'
import { attrsCalender } from '@/config/calender'
import { CurrencyDollarIcon } from '@heroicons/vue/24/outline'

const { getMetrics, getBillings } = useService()
const metrics = ref<Metrics>()
const listing = ref<Listing>()
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

async function fetchMetric() {
  metrics.value = await getMetrics(currentDate, lastMonth)
}

async function fetchListing() {
  listing.value = await getBillings(currentPage.value)
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
  <main>
    <div class="p-7 flex gap-4 2xl:gap-8 flex-wrap sm:flex-nowrap">
      <div class="w-full sm:max-w-[22%]">
        <Sidebar v-motion-fade :delay="300" />
        <div
          class="bg-primary-50 rounded-2xl text-white py-6 px-4"
          v-motion-slide-bottom
          :delay="300"
        >
          <div
            class="p-4 rounded-lg shadow-md"
            style="
              background: linear-gradient(
                90deg,
                rgba(48, 123, 35, 1) 0%,
                rgba(87, 225, 64, 1) 100%
              );
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
            :select-attribute="attrsCalender"
            :drag-attribute="attrsCalender"
          />
        </div>
      </div>
      <div class="w-full sm:max-w-[59%]">
        <div class="flex gap-8 w-full mb-8 flex-wrap 2xl:flex-nowrap">
          <FinanceCard
            :delay="300"
            v-motion-slide-left
            v-if="metrics"
            :metrics="metrics"
            :background-chart="['#307B23', '#B2EDA8']"
            style="
              background: linear-gradient(
                80deg,
                rgba(48, 123, 35, 1) 0%,
                rgba(87, 225, 64, 1) 100%
              );
            "
          >
            <template #text-total> Total MRR </template>
            <template #total>
              {{ useCurrencyFormatter(parseInt(metrics.total)).value }}
            </template>
          </FinanceCard>
          <FinanceCard
            v-motion-slide-right
            :delay="300"
            v-if="metrics"
            :metrics="metrics"
            :background-chart="['#B2EDA8', '#307B23']"
            style="
              background: linear-gradient(
                270deg,
                rgba(48, 123, 35, 1) 0%,
                rgba(87, 225, 64, 1) 100%
              );
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
        />
        <ListBillings
          v-motion-slide-top
          :delay="300"
          v-if="listing"
          :billings="listing.billings"
          @status="handleStatus"
        />
        <Pagination
          v-if="listing && Object.keys(listing.billings).length"
          :page="currentPage"
          :listing="listing"
          @page="handlePage"
        />
      </div>
      <div class="w-full sm:max-w-[22%]">
        <AboutCompany v-motion-slide-bottom :delay="300" />
        <ProfitCard
          v-if="metrics"
          :churn="metrics.churn.total"
          :mrr="metrics.total"
          v-motion-slide-bottom
          :delay="300"
        />
      </div>
    </div>
    <footer class="bg-primary-50 rounded-lg shadow m-7 mt-0" v-motion-slide-bottom>
      <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="flex items-center justify-center">
          <router-link to="/" class="flex items-center flex-col gap-2">
            <CurrencyDollarIcon
              class="w-28 h-28 text-primary-300 rounded-full border-primary-200 border-2"
            />
            <h1 class="text-white">Finanças - Company</h1>
          </router-link>
        </div>
        <hr class="my-6sm:mx-auto border-white lg:my-8" />
        <span class="block text-sm text-white text-center"
          >© 2024 <router-link to="/" class="hover:underline">Finança - Company </router-link>. All
          Rights Reserved.</span
        >
      </div>
    </footer>
  </main>
</template>
<style scoped></style>
