<template>
  <div class="header-buttons">
    <el-button @click="handleNavigate('menu')" plain>
      <inline-svg
        class="button-icon"
        width="31.5"
        height="36px"
        src="/svg/menu-button.svg"
      />
      <div class="button-title">Menu</div>
      <div class="button-description">Découvrez notre carte gastronomique</div>
    </el-button>
    <el-button @click="handleNavigate('reservation')" plain>
      <inline-svg
        class="button-icon"
        width="31.5"
        height="36px"
        src="/svg/reservation-button.svg"
      />
      <div class="button-title">Réserver</div>
      <div class="button-description">Planifiez votre expérience culinaire</div>
    </el-button>
    <el-button @click="handleNavigate('about')" plain>
      <inline-svg
        class="button-icon"
        width="31.5"
        height="36px"
        src="/svg/location-button.svg"
      />
      <div class="button-title">A Propos</div>
      <div class="button-description">Au cœur de la ville</div>
    </el-button>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const photoes = ref(["/photo/header1.jpg", "/photo/header2.webp"]);

const handleNavigate = (destination: string) => {
  router.push({ name: destination });
};
</script>
<style lang="scss" scoped>
.header-buttons {
  width: 100%;
  display: flex;
  :deep(.el-button.is-plain) {
    width: 100%;
    border-radius: 8px;
    opacity: 1;
    background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.001),
        rgba(0, 0, 0, 0.001)
      ),
      #ffffff;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
    height: 150px;
    position: relative;
    transition: all 0.3s ease;

    span {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 12px 0px;
      gap: 10px;
      flex-wrap: wrap;
      align-content: center;
      transition: all 0.3s ease;

      .button-title {
        font-size: 20px;
        font-weight: 600;
        line-height: 28px;
        text-align: center;
        letter-spacing: 0px;
        color: #000000;
        transition: opacity 0.3s ease;
      }

      .button-description {
        font-size: 16px;
        font-weight: normal;
        line-height: 24px;
        text-align: center;
        letter-spacing: 0px;
        color: #4b5563;
        transition: opacity 0.3s ease;
      }

      /* Supposons que votre icône a une classe .button-icon */
      .button-icon {
        transition: transform 0.3s ease;
        color: #92400e;
      }
    }

    &:hover {
      background: black;

      span {
        .button-title,
        .button-description {
          opacity: 0;
          height: 0;
          overflow: hidden;
          margin: 0;
          padding: 0;
        }

        .button-icon {
          transform: scale(1.5); /* Agrandit l'icône */
          color: #ffffff;
        }
      }
    }
  }
}
</style>
