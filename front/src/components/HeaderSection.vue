<template>
  <div class="home-header">
    <el-carousel>
      <el-carousel-item v-for="item in photoes" :key="item">
        <img :src="item" class="images" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const photoes = ref(["/photo/header1.jpg", "/photo/header2.webp"]);
</script>
<style lang="scss" scoped>
.home-header {
  position: relative;
  left: -50px;
  width: calc(100% + 100px);
  :deep(.el-carousel__container) {
    height: 50vh;
  }
  .images {
    width: 100%;
    object-fit: fill;
    height: 50vh;
  }
}
</style>
