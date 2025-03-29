<template>
  <div class="home-section">
    <div class="title">{{ title }}</div>
    <slot />
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();
</script>
<style lang="scss" scoped>
.home-section {
  border-radius: 8px;
  opacity: 1;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.001), rgba(0, 0, 0, 0.001)),
    #ffffff;
  box-shadow: 0px 0px 5px 1px grey;
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 10px;
  flex-wrap: wrap;
  align-content: flex-start;
  z-index: 1;
}
</style>
