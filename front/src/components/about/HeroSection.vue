<template>
  <div class="hero-section">
    <div class="overlay">
      <div class="title">Where Every Cup Tells a Story</div>
      <div class="text">
        Experience the perfect blend of artisanal coffee, warm hospitality, and
        cozy ambiance at Brew Haven.
      </div>
      <el-button>explorer notre menu</el-button>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.hero-section {
  position: relative;
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)),
    url("/photo/header2.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  .overlay {
    position: absolute;
    top: 50%;
    left: 40px;
    display: flex;
    flex-direction: column;
    transform: translateY(-50%);
    gap: 25px;
    padding: 24px;
    // border-radius: 8px;
    // background: rgba(243, 244, 246, 0.1);
    // backdrop-filter: blur(5px);
    .title {
      font-size: 60px;
      font-weight: bold;
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
    :deep(.el-button) {
      width: 150px;
    }
  }
}
</style>
