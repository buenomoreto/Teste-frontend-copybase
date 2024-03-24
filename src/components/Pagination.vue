<script setup lang="ts">
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon
} from '@heroicons/vue/24/outline'
import { ref, computed } from 'vue'

const emit = defineEmits(['page'])
const { listing, page } = defineProps(['listing', 'page'])

const currentPage = ref<number>(page)

const visiblePageNumbers = computed(() => {
  const pageNumbers = []
  const maxVisiblePages = 5
  const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2)
  let startPage = currentPage.value - halfMaxVisiblePages
  let endPage = currentPage.value + halfMaxVisiblePages

  if (startPage < 1) {
    endPage += 1 - startPage
    startPage = 1
  }
  if (endPage > listing.numberOfPages) {
    endPage = listing.numberOfPages
    startPage = Math.max(1, endPage - maxVisiblePages + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    if (i <= listing.numberOfPages) {
      pageNumbers.push(i)
    }
  }

  return pageNumbers
})

function goToPage(page: number) {
  if (page >= 1 && page <= listing.numberOfPages) {
    currentPage.value = page
    emit('page', currentPage.value)
  }
}
</script>
<template>
  <div class="flex justify-between items-center mt-8">
    <span class="text-sm font-normal text-white mb-4 md:mb-0 block w-full md:inline md:w-auto"
      >Exbindo
      <span class="font-semibold text-white">{{ currentPage }}-{{ listing.numberOfPages }}</span>
      de <span class="font-semibold text-white">{{ listing.total }}</span></span
    >
    <nav aria-label="Pagination">
      <ul class="pagination">
        <li :class="{ disabled: currentPage === 1 }">
          <button @click="goToPage(1)" :disabled="currentPage === 1">
            <ChevronDoubleLeftIcon class="w-6 h-6" />
          </button>
        </li>
        <li :class="{ disabled: currentPage === 1 }">
          <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">
            <ChevronLeftIcon class="w-6 h-6" />
          </button>
        </li>
        <li
          v-for="pageNumber in visiblePageNumbers"
          :key="pageNumber"
          :class="{ disabled: currentPage === listing.numberOfPages }"
        >
          <button
            @click="goToPage(pageNumber)"
            :class="{ active: pageNumber === currentPage }"
            v-if="pageNumber <= listing.numberOfPages"
          >
            {{ pageNumber }}
          </button>
        </li>
        <li :class="{ disabled: currentPage === listing.numberOfPages }">
          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === listing.numberOfPages"
          >
            <ChevronRightIcon class="w-6 h-6" />
          </button>
        </li>
        <li :class="{ disabled: currentPage === listing.numberOfPages }">
          <button
            @click="goToPage(listing.numberOfPages)"
            :disabled="currentPage === listing.numberOfPages"
          >
            <ChevronDoubleRightIcon class="w-6 h-6" />
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>
<style scoped>
.pagination {
  display: flex;
  list-style: none;
}

.pagination li {
  margin-right: 0.5rem;
}
.pagination li:last-child {
  margin-right: 0;
}
.pagination button {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  background-color: #262d33;
  cursor: pointer;
  color: #fff;
  border-radius: 5px;
}
.pagination .active {
  border: 1px solid #8ce77c;
  background-color: #57e140;
  color: #fff;
}
.pagination button:hover {
  border: 1px solid #8ce77c;
  background-color: #57e140;
  color: #fff;
}

.pagination button:focus {
  outline: none;
}

.pagination .disabled button {
  pointer-events: none;
  opacity: 0.5;
}
</style>
