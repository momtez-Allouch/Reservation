<template>
  <div class="about-page">
    <HeroSection />
    <AboutUsSection />
    <FindUsSection />
    <GallerySection />
  </div>
</template>
<script setup lang="ts">
import AboutUsSection from "@/components/about/AboutUsSection.vue";
import GallerySection from "@/components/about/GallerySection.vue";
import FindUsSection from "@/components/about/FindUsSection.vue";
import HeroSection from "@/components/about/HeroSection.vue";
</script>
<style lang="scss" scoped>
.about-page {
  display: flex;
  flex-direction: column;
  gap: 40px;

  .about-us-section {
    display: flex;
    gap: 20px;
    .content {
      display: flex;
      flex-direction: column;
      gap: 20px;
      .facts {
        display: flex;
        gap: 10px;
      }
    }
    .image {
      height: 500px;
      @media (max-width: 1200px) {
        display: none;
      }
    }
  }
}
</style>
