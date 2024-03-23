<script setup lang="ts">
const emit = defineEmits(['status'])

function handleStatus(event: any) {
  emit('status', event.target.value)
}
</script>
<template>
  <div class="w-full max-w-[550px] flex items-center gap-10 mb-6">
    <h3 class="text-xl text-white">Status</h3>
    <ul class="items-center w-full text-sm font-medium text-white flex">
      <li class="w-full">
        <div class="flex items-center">
          <input
            id="horizontal-list-radio-license"
            type="radio"
            value="Ativa"
            name="list-radio"
            @click="handleStatus"
            class="w-4 h-4 text-primary-300 bg-gray-100 border-gray-300 accent-primary-300"
          />
          <label
            for="horizontal-list-radio-license"
            class="w-full py-3 ms-2 text-base font-medium text-white"
            >Ativa
          </label>
        </div>
      </li>
      <li class="w-full">
        <div class="flex items-center ps-3">
          <input
            id="horizontal-list-radio-id"
            type="radio"
            value="Cancelada"
            @click="handleStatus"
            name="list-radio"
            class="w-4 h-4 text-primary-300 bg-gray-100 border-gray-300 accent-primary-300"
          />
          <label
            for="horizontal-list-radio-id"
            class="w-full py-3 ms-2 text-base font-medium text-white"
            >Cancelada</label
          >
        </div>
      </li>
      <li class="w-full">
        <div class="flex items-center ps-3">
          <input
            id="horizontal-list-radio-military"
            type="radio"
            value="Trial cancelado"
            @click="handleStatus"
            name="list-radio"
            class="w-4 h-4 text-primary-300 bg-gray-100 border-gray-300 accent-primary-300"
          />
          <label
            for="horizontal-list-radio-military"
            class="w-full py-3 ms-2 text-base font-medium text-white"
            >Trial cancelado</label
          >
        </div>
      </li>
    </ul>
  </div>
</template>
