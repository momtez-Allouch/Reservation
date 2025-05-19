<template>
  <div class="category-card">
    <div class="title">{{ title }}</div>
    <div class="category-card-content">
      <div v-for="product in products" class="category-item">
        <div>{{ product.name }}</div>
        <div>{{ product.price }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  title: string;
  products: [];
}>();
</script>
<style lang="scss" scoped>
.category-card {
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
  .category-card-content {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 100%;
    .category-item {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
