<template>
  <div class="header-buttons">
    <el-button plain>Réserver</el-button>
    <el-button plain>Menu</el-button>
    <el-button plain>A Propos</el-button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const photoes = ref(["/photo/header1.jpg", "/photo/header2.webp"]);
</script>
<style lang="scss" scoped>
.header-buttons {
  width: 100%;
  display: flex;
  :deep(.el-button.is-plain) {
    width: 100%;
  }
}
</style>
