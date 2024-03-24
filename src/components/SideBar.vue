<script setup lang="ts">
import useService from '@/composables/useService'
import { toast } from 'vue3-toastify'
import { HomeIcon, DocumentDuplicateIcon } from '@heroicons/vue/24/outline'

const { uploadFile } = useService()

async function handleFileChange(event: any) {
  const formData = new FormData()
  formData.append('file', event.target.files[0])

  const allowedFormats = [
    'text/csv',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ]

  if (!allowedFormats.includes(event.target.files[0].type)) {
    formData.delete('file')
    toast.error('Formato de arquivo inválido. Por favor, envie um arquivo .xlsx ou .csv.', {
      position: toast.POSITION.BOTTOM_RIGHT
    })
    return
  }

  const loadingToast = toast.loading('Carregando...', {
    position: toast.POSITION.BOTTOM_RIGHT
  })

  try {
    const response = await uploadFile(formData)

    toast.success(response.message, {
      position: toast.POSITION.BOTTOM_RIGHT
    })
  } finally {
    toast.remove(loadingToast)
    setTimeout(() => {
      window.location.reload()
    }, 3500)
  }
}
</script>
<template>
  <aside class="bg-primary-50 rounded-2xl text-white py-6 w-full mb-6">
    <ul class="gap-7 flex flex-col h-full">
      <li
        class="flex gap-2 text-base px-4 w-full font-bold cursor-pointer group relative h-8 items-center"
      >
        <div class="h-full w-1 rounded absolute left-0 bg-primary-200"></div>
        <HomeIcon class="text-white h-6 w-6" /> Dashboard
      </li>
      <li
        class="flex gap-2 text-base font-normal px-4 w-full hover:font-bold cursor-pointer group relative h-8 items-center"
      >
        <div class="h-full w-1 rounded absolute left-0 group-hover:bg-primary-200"></div>
        <label for="upload" class="flex gap-2 cursor-pointer">
          <DocumentDuplicateIcon class="text-white h-6 w-6" /> Enviar arquivo
          <input type="file" @change="handleFileChange" id="upload" class="hidden" />
        </label>
      </li>
    </ul>
  </aside>
</template>
<style scoped></style>
