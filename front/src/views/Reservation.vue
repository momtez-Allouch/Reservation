<script setup lang="ts">
import { ref } from "vue";

// Liste des tables avec leurs coordonnées, état et nombre de chaises
const tables = ref([
  { id: 1, x: 50, y: 100, reserved: false, chairs: 4 },
  { id: 2, x: 200, y: 200, reserved: true, chairs: 2 },
  { id: 3, x: 350, y: 300, reserved: false, chairs: 6 },
]);

// Gérer la réservation d'une table
const toggleReservation = (table: any) => {
  if (!table.reserved) {
    alert(`Table ${table.id} réservée !`);
    table.reserved = true;
  } else {
    alert(`Table ${table.id} est déjà réservée.`);
  }
};
</script>

<template>
  <div class="table-map">
    <div
      v-for="table in tables"
      :key="table.id"
      class="table"
      :class="{ reserved: table.reserved }"
      :style="{ left: table.x + 'px', top: table.y + 'px' }"
      @click="toggleReservation(table)"
    >
      <span>#{{ table.id }}</span>
      <div class="chairs">
        <div v-for="n in table.chairs" :key="n" class="chair"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table-map {
  position: relative;
  width: 600px;
  height: 400px;
  background: #f3f3f3;
  border: 2px solid #ccc;
  border-radius: 10px;
  margin: auto;
}

.table {
  position: absolute;
  width: 50px;
  height: 50px;
  background: #4caf50;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
  font-size: 14px;
  font-weight: bold;
}

.table.reserved {
  background: #e74c3c;
  cursor: not-allowed;
}

/* Position des chaises autour de la table */
.chairs {
  position: absolute;
  width: 100px;
  height: 100px;
  top: -25px;
  left: -25px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}

.chair {
  width: 20px;
  height: 20px;
  background: #8b8b8b;
  border-radius: 50%;
}
</style>
