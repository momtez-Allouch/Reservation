<template>
  <div class="gallery-section">
    <div class="title">Photo Gallery</div>
    <Carousel v-bind="config">
      <Slide v-for="image in images" :key="image.id">
        <img :src="image.url" alt="image" />
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>
<script setup lang="ts">
import "vue3-carousel/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";

const images = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: `https://picsum.photos/seed/${Math.random()}/800/600`,
}));
const config = {
  height: 300,
  itemsToShow: 3.5,
  wrapAround: true,
  //   breakpoints: {
  //     // 300px and up
  //     300: {
  //       itemsToShow: 2,
  //       snapAlign: "center",
  //     },
  //     // 400px and up
  //     400: {
  //       itemsToShow: 3,
  //       snapAlign: "start",
  //     },
  //     // 500px and up
  //     500: {
  //       itemsToShow: 4,
  //       snapAlign: "start",
  //     },
  //   },
};
</script>
<style lang="scss" scoped>
.gallery-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  .title {
    font-size: 36px;
    font-weight: bold;
    line-height: 40px;
    text-align: center;
    letter-spacing: 0px;
    color: #111827;
  }
}
:root {
  --carousel-transition: 300ms;
  --carousel-opacity-inactive: 0.7;
  --carousel-opacity-active: 1;
  --carousel-opacity-near: 0.9;

  background-color: #242424;
}

.carousel {
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}

img {
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel__viewport {
  perspective: 2000px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: opacity var(--carousel-transition),
    transform var(--carousel-transition);
}

.carousel.is-dragging .carousel__slide {
  transition: opacity var(--carousel-transition),
    transform var(--carousel-transition);
}

.carousel__slide {
  opacity: var(--carousel-opacity-inactive);
  transform: translateX(10px) rotateY(-12deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: var(--carousel-opacity-near);
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: var(--carousel-opacity-active);
  transform: rotateY(0) scale(1);
}

.carousel__slide--next {
  opacity: var(--carousel-opacity-near);
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--next ~ .carousel__slide {
  opacity: var(--carousel-opacity-inactive);
  transform: translateX(-10px) rotateY(12deg) scale(0.9);
}
</style>
