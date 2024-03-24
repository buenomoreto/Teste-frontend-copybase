<script setup lang="ts">
const emit = defineEmits(['status'])

function handleStatus(event: any) {
  emit('status', event.target.value)
}
</script>

<template>
  <div class="flex items-center gap-6">
    <h3 class="text-xl text-white">Status:</h3>
    <div class="flex rounded-lg select-none">
      <label class="radio flex flex-grow items-center justify-center rounded-md p-1 cursor-pointer">
        <input
          type="radio"
          name="list-radio"
          value=""
          class="peer hidden"
          checked
          @click="handleStatus"
        />
        <span
          class="px-4 py-2 text-sm tracking-widest peer-checked:bg-primary-200 hover:bg-primary-200 hover:text-white peer-checked:text-white text-gray-300 p-2 rounded-lg transition duration-150 ease-in-out"
          >Todos</span
        >
      </label>
      <label class="radio flex flex-grow items-center justify-center rounded-md p-1 cursor-pointer">
        <input
          type="radio"
          name="list-radio"
          value="Ativa"
          class="peer hidden"
          @click="handleStatus"
        />
        <span
          class="px-4 py-2 text-sm tracking-widest peer-checked:bg-primary-300 hover:bg-primary-300 hover:text-white peer-checked:text-white text-gray-300 p-2 rounded-lg transition duration-150 ease-in-out"
          >Ativa</span
        >
      </label>

      <label class="radio flex flex-grow items-center justify-center rounded-md p-1 cursor-pointer">
        <input
          type="radio"
          name="list-radio"
          value="Cancelada"
          class="peer hidden"
          @click="handleStatus"
        />
        <span
          class="px-4 py-2 text-sm tracking-widest peer-checked:bg-primary-500 hover:bg-primary-500 hover:text-white peer-checked:text-white text-gray-300 p-2 rounded-lg transition duration-150 ease-in-out"
          >Cancelada</span
        >
      </label>

      <label class="radio flex flex-grow items-center justify-center rounded-md p-1 cursor-pointer">
        <input
          type="radio"
          name="list-radio"
          value="Trial cancelado"
          class="peer hidden"
          @click="handleStatus"
        />
        <span
          class="px-4 py-2 text-sm tracking-widest peer-checked:bg-primary-600 hover:bg-primary-600 hover:text-white peer-checked:text-white text-gray-300 p-2 rounded-lg transition duration-150 ease-in-out"
          >Trial cancelado</span
        >
      </label>
    </div>
  </div>
</template>
