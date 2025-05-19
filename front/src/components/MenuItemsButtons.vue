<template>
  <div class="menu-items-buttons">
    <button class="menu-button isActive">Home</button>

    <button class="menu-button">Menu</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const photoes = ref(["/photo/header1.jpg", "/photo/header2.webp"]);
</script>
<style lang="scss" scoped>
.menu-items-buttons {
  display: flex;
  background-color: #e5e7eb;
  gap: 5px;
  padding: 4px;
  border-radius: 4px;
  width: max-content;
  .menu-button {
    cursor: pointer;
    padding: 8px 16px;
    border-radius: 4px;
    background-color: transparent;
    border: none;
    &:hover {
      background-color: #d1d5db;
    }
    &.isActive {
      background-color: white !important;
    }
  }
}
</style>
