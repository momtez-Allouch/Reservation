<template>
  <div class="about-us-section">
    <div class="content">
      <div class="title">Our Story</div>
      <div class="text">
        Founded in 2015, Brew Haven has been a sanctuary for coffee lovers
        seeking exceptional quality and authentic experiences. We source our
        beans directly from sustainable farms worldwide, ensuring each cup
        represents the perfect harmony of flavor and ethics.
      </div>
      <div class="facts">
        <div class="fact">
          <div class="number">5+</div>
          <div class="label">Years of Experience</div>
        </div>
        <div class="fact">
          <div class="number">5+</div>
          <div class="label">Years of Experience</div>
        </div>
        <div class="fact">
          <div class="number">5+</div>
          <div class="label">Years of Experience</div>
        </div>
      </div>
    </div>
    <div class="image">
      <img src="/photo/header2.webp" class="image" />
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.about-us-section {
  display: flex;
  gap: 20px;
  background-color: #f9fafb;
  border-radius: 10px;
  .content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    padding: 0 30px;
    .title {
      font-size: 36px;
      font-weight: bold;
      line-height: 40px;
      letter-spacing: 0px;
      color: #111827;
    }
    .text {
      padding: 0 10px;
      font-size: 16px;
      font-weight: normal;
      line-height: 24px;
      letter-spacing: 0px;
      color: #4b5563;
    }
    .facts {
      display: flex;
      gap: 10px;
      .number {
        font-size: 36px;
        font-weight: bold;
        line-height: 40px;
        letter-spacing: 0px;
        color: #000000;
      }
      .label {
        font-size: 16px;
        font-weight: normal;
        line-height: 24px;
        letter-spacing: 0px;
        color: #4b5563;
      }
    }
  }
  .image {
    border-radius: 10px;
    height: 300px;
    @media (max-width: 1200px) {
      display: none;
    }
  }
}
</style>
