<template>
  <div class="home-header">
    <el-carousel>
      <el-carousel-item v-for="item in photoes" :key="item">
        <img :src="item" class="images" />
      </el-carousel-item>
    </el-carousel>
    <div class="overlay">
      <div class="title">Where Every Cup Tells a Story</div>
      <div class="text">
        Experience the perfect blend of artisanal coffee, warm hospitality, and
        cozy ambiance at Brew Haven.
      </div>
      <div class="buttons-section">
        <button class="button">Reserver</button>
        <button class="button isPlain">Explorer Menu</button>
        <button class="button isPlain">About Us</button>
      </div>
    </div>
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
    height: 90vh;
    position: relative;

    // Add this to create a darkening effect on all carousel items
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6));
      z-index: 1;
    }
  }

  .images {
    width: 100%;
    object-fit: fill;
    height: 90vh;
  }

  .overlay {
    position: absolute;
    top: 50%;
    left: 40px;
    display: flex;
    flex-direction: column;
    transform: translateY(-50%);
    gap: 25px;
    padding: 24px;
    z-index: 2; // Make sure overlay is above the darkening layer

    .title {
      font-size: 36px;
      font-weight: 700;
      line-height: 60px;
      letter-spacing: 0px;
      color: #f9fafb;
    }
    .text {
      font-size: 20px;
      font-weight: normal;
      line-height: 28px;
      letter-spacing: 0px;
      color: #f9fafb;
      width: 70%;
    }
    .buttons-section {
      display: flex;
      gap: 15px;
    }
  }
}
</style>
