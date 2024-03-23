<script setup lang="ts">
import {
  CurrencyDollarIcon,
  IdentificationIcon,
  CodeBracketIcon,
  PresentationChartBarIcon
} from '@heroicons/vue/24/outline'
</script>
<template>
  <section class="bg-primary-50 rounded-2xl text-white py-6 max-w-[400px] w-full px-6 mb-6">
    <div class="flex justify-center flex-col items-center gap-3 border-b border-white pb-4 mb-6">
      <CurrencyDollarIcon
        class="w-28 h-28 text-primary-300 rounded-full border-primary-200 border-2"
      />
      <h1>Finanças - Company</h1>
      <div class="flex gap-5">
        <div class="w-12 h-12 rounded-xl bg-primary-300 flex justify-center items-center">
          <IdentificationIcon class="w-6 h-6 text-white" />
        </div>
        <div class="w-12 h-12 rounded-xl bg-primary-300 flex justify-center items-center">
          <CodeBracketIcon class="w-6 h-6 text-white" />
        </div>
        <div class="w-12 h-12 rounded-xl bg-primary-300 flex justify-center items-center">
          <PresentationChartBarIcon class="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
    <div class="text-lg text-white">Sobre</div>
    <p class="text-gray-400 text-sm">
      Nosso código simplifica a análise de arquivos xlsx ou .csv e salva as informações importantes
      em um banco de dados seguro. Além disso, fornecemos métricas como MRR e Churn Rate para ajudar
      a entender melhor suas finanças.
    </p>
  </section>
</template>
