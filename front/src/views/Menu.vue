<template>
  <CategorieCard
    v-for="category in categoriesList"
    :title="category.name"
    :products="category.products"
  />
</template>
<script setup lang="ts">
import CategorieCard from "@/components/menu/CategorieCard.vue";
import { onMounted } from "vue";
import { useCategotyStore } from "@/stores/categoryModule";
import { storeToRefs } from "pinia";

const { getAllCategories } = useCategotyStore();
const { categoriesList } = storeToRefs(useCategotyStore());
onMounted(async () => {
  await getAllCategories();
});
</script>
<style lang="scss" scoped></style>
