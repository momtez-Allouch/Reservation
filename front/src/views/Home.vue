<template>
  <div class="home-page">
    <HeaderSection />
    <HeaderButtons />
    <HomeSection title="À Propos de Nous">
      <slot>
        <div class="slot-content">
          <div>
            Situé au cœur de Paris, Le Bistrot Parisien vous propose une
            expérience gastronomique authentique. Notre chef étoilé combine
            traditions culinaires françaises et créativité moderne pour créer
            des plats exceptionnels.
          </div>
        </div>
      </slot>
    </HomeSection>
    <HomeSection title="Horaires d'Ouverture">
      <slot>
        <div class="slot-content">
          <div class="open-hours-item">
            <div>Lundi - Vendredi</div>
            <div>12h00 - 23h00</div>
          </div>
          <div class="open-hours-item">
            <div>Samedi</div>
            <div>11h00 - 00h00</div>
          </div>
        </div>
      </slot>
    </HomeSection>
    <HomeSection title="Contact">
      <slot>
        <div class="slot-content">
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
      </slot>
    </HomeSection>
  </div>
</template>

<script setup lang="ts">
import HeaderSection from "@/components/HeaderSection.vue";
import HeaderButtons from "@/components/home/HeaderButtons.vue";
import HomeSection from "@/components/home/HomeSection.vue";
</script>

<style lang="scss" scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
  .slot-content {
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
</style>
