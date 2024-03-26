<script setup lang="ts">
const { height } = defineProps(['height'])
</script>
<template>
  <div
    class="flex flex-col gap-2 w-full bg-primary-50 p-4 2xl:p-8 rounded-2xl shadow-md hover:duration-150 duration-150"
    :style="{ height: height + 'px' }"
  >
    <div class="flex flex-row justify-between w-full">
      <div class="flex flex-col w-full gap-2">
        <div class="bg-primary rounded-md w-[300px] h-4 animate-pulse"></div>
        <div class="bg-primary rounded-md w-[150px] h-4 animate-pulse"></div>
      </div>
    </div>
  </div>
</template>
<style lang=""></style>
