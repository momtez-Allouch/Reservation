<template>
  <div class="find-us-section">
    <div class="content">
      <div class="title">Find Us</div>
      <div class="open-hours-card">
        <div class="open-hours-card-title">Opening Hours</div>
        <div class="open-hours-card-items">
          <div class="open-hours-item">
            <div>Lundi - Vendredi</div>
            <div>12h00 - 23h00</div>
          </div>
          <div class="open-hours-item">
            <div>Samedi</div>
            <div>11h00 - 00h00</div>
          </div>
        </div>
      </div>
      <div class="contact-section">
        <div class="contact-item">
          <inline-svg
            src="/svg/phone-svgrepo-com.svg"
            width="20px"
            height="20px"
          />
          <div>+33 1 45 67 89 10</div>
        </div>
        <div class="contact-item">
          <inline-svg
            src="/svg/contact-dm-email-svgrepo-com.svg"
            width="20px"
            height="20px"
          />
          <div>contact@lebistrotparisien.fr</div>
        </div>
        <div class="contact-item">
          <inline-svg
            src="/svg/map-point-svgrepo-com.svg"
            width="20px"
            height="20px"
          />
          <div>15 Rue de la Gastronomie, 75001 Paris</div>
        </div>
      </div>
    </div>
    <div class="image">
      <img src="/photo/header2.webp" class="image" style="width: 100%" />
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.find-us-section {
  display: flex;
  gap: 20px;
  .content {
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    padding: 0 30px;
    width: 50%;
    .title {
      font-size: 36px;
      font-weight: bold;
      line-height: 40px;
      letter-spacing: 0px;
      color: #111827;
    }
    .open-hours-card {
      display: flex;
      flex-direction: column;
      gap: 10px;
      border-radius: 8px;
      background: #f3f4f6;
      padding: 24px;
      .open-hours-card-title {
        font-size: 16px;
        font-weight: 600;
        line-height: 24px;
        letter-spacing: 0px;
        color: #000000;
      }
      .open-hours-card-items {
        display: flex;
        flex-direction: column;
        gap: 5px;
        .open-hours-item {
          display: flex;
          justify-content: space-between;
        }
      }
    }
    .contact-section {
      display: flex;
      flex-direction: column;
      gap: 5px;
      width: 100%;
      .open-hours-item {
        display: flex;
        justify-content: space-between;
      }
      .contact-item {
        display: flex;
        gap: 5px;
      }
    }
  }
  .image {
    width: 50%;
    border-radius: 10px;
    height: 300px;
    @media (max-width: 1200px) {
      display: none;
    }
  }
}
</style>
