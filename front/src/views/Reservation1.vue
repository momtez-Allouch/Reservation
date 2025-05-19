<template>
  <div class="cafe-app">
    <div class="sidebar">
      <h2>Tables</h2>
      <div class="table-templates">
        <div
          class="template"
          v-for="item in shapesConfig"
          @mousedown="addTable(item.type)"
        >
          <v-stage :config="stageConfig">
            <v-layer>
              <v-shape :config="item.config" />
            </v-layer>
          </v-stage>
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
    <div class="cafe-layout">
      <h2>Salon du Café</h2>
      <div class="layout-area">
        <v-stage
          ref="stage"
          :config="layoutStageConfig"
          @dragstart="handleDragstart"
          @dragend="handleDragend"
        >
          <v-layer ref="layer">
            <v-shape
              v-for="(table, index) in tables"
              :key="table.id"
              :config="{
                draggable: true,
                x: table.x,
                y: table.y,
                id: table.id,
                ...getTableConfig(table),
                fill: 'blue',
              }"
            />
          </v-layer>
        </v-stage>
      </div>
      <div class="controls">
        <button @click="clearLayout" class="control-btn">Effacer tout</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

const tables = ref([]);
const dragItemId = ref(null);

const stageConfig = {
  width: 150,
  height: 100,
};
const layoutStageConfig = {
  width: 700,
  height: 400,
};

const shapesConfig = [
  {
    name: "Table rectangulaire",
    type: "rect",
    config: {
      width: 150,
      height: 100,
      sceneFunc: function (context, shape) {
        const width = shape.width();
        const height = shape.height();

        // Table rectangulaire avec coins arrondis
        context.beginPath();
        const tableWidth = width * 0.7;
        const tableHeight = height * 0.4;
        const tableX = (width - tableWidth) / 2;
        const tableY = (height - tableHeight) / 2;
        const radius = 15;

        context.moveTo(tableX + radius, tableY);
        context.lineTo(tableX + tableWidth - radius, tableY);
        context.arcTo(
          tableX + tableWidth,
          tableY,
          tableX + tableWidth,
          tableY + radius,
          radius
        );
        context.lineTo(tableX + tableWidth, tableY + tableHeight - radius);
        context.arcTo(
          tableX + tableWidth,
          tableY + tableHeight,
          tableX + tableWidth - radius,
          tableY + tableHeight,
          radius
        );
        context.lineTo(tableX + radius, tableY + tableHeight);
        context.arcTo(
          tableX,
          tableY + tableHeight,
          tableX,
          tableY + tableHeight - radius,
          radius
        );
        context.lineTo(tableX, tableY + radius);
        context.arcTo(tableX, tableY, tableX + radius, tableY, radius);
        context.fillStyle = "#DDDDDD";
        context.fill();
        context.stroke();
        context.fillStrokeShape(shape);

        // Dimensions des chaises
        const chairWidth = 20;
        const chairHeight = 15;
        const chairRadius = 6;
        const chairPadding = 3;
        const chairSpacing = (tableWidth - chairWidth * 2) / 3;

        // Fonction de dessin des chaises
        function drawChair(x, y) {
          context.beginPath();
          context.moveTo(x, y + chairRadius);
          context.lineTo(x, y + chairHeight);
          context.lineTo(x + chairWidth, y + chairHeight);
          context.lineTo(x + chairWidth, y + chairRadius);
          context.arcTo(
            x + chairWidth,
            y,
            x + chairWidth - chairRadius,
            y,
            chairRadius
          );
          context.lineTo(x + chairRadius, y);
          context.arcTo(x, y, x, y + chairRadius, chairRadius);
          context.fillStyle = "#DDDDDD";
          context.fill();
          context.stroke();
        }

        // Chaises du haut
        const topChairY = tableY - chairHeight - chairPadding;
        drawChair(tableX + chairSpacing, topChairY);
        context.fillStrokeShape(shape);
        drawChair(tableX + tableWidth - chairSpacing - chairWidth, topChairY);
        context.fillStrokeShape(shape);
        // Chaises du bas - rotation 180°
        context.save();
        context.translate(
          tableX + chairSpacing + chairWidth,
          tableY + tableHeight + chairPadding + chairHeight
        );
        context.rotate(Math.PI);
        drawChair(0, 0);
        context.restore();
        context.fillStrokeShape(shape);
        context.save();
        context.translate(
          tableX + tableWidth - chairSpacing,
          tableY + tableHeight + chairPadding + chairHeight
        );
        context.rotate(Math.PI);
        drawChair(0, 0);
        context.restore();
        context.fillStrokeShape(shape);
        // Chaise gauche - rotation 90°
        context.save();
        context.translate(
          tableX - chairPadding - chairHeight,
          tableY + (tableHeight + chairWidth) / 2
        );
        context.rotate(-Math.PI / 2);
        drawChair(0, 0);
        context.restore();
        context.fillStrokeShape(shape);
        // Chaise droite - rotation -90°
        context.save();
        context.translate(
          tableX + tableWidth + chairPadding + chairHeight,
          tableY + (tableHeight - chairWidth) / 2
        );
        context.rotate(Math.PI / 2);
        drawChair(0, 0);
        context.restore();
        context.fillStrokeShape(shape);
      },
      fill: "transparent",
      stroke: "black",
      strokeWidth: 1,
    },
  },
  {
    name: "Table carrée",
    type: "square",
    config: {
      width: 150,
      height: 100,
      sceneFunc: function (context, shape) {
        const width = shape.width();
        const height = shape.height();

        // Table carrée
        context.beginPath();
        const tableSize = Math.min(width, height) * 0.5;
        const tableX = (width - tableSize) / 2;
        const tableY = (height - tableSize) / 2;

        context.rect(tableX, tableY, tableSize, tableSize);
        context.fillStyle = "#DDDDDD";
        context.fill();
        context.stroke();
        context.fillStrokeShape(shape);
        // Dimensions des chaises
        const chairWidth = 20;
        const chairHeight = 15;
        const chairRadius = 6;
        const chairPadding = 3;

        // Fonction de dessin des chaises
        function drawChair(x, y) {
          context.beginPath();
          context.moveTo(x, y + chairRadius);
          context.lineTo(x, y + chairHeight);
          context.lineTo(x + chairWidth, y + chairHeight);
          context.lineTo(x + chairWidth, y + chairRadius);
          context.arcTo(
            x + chairWidth,
            y,
            x + chairWidth - chairRadius,
            y,
            chairRadius
          );
          context.lineTo(x + chairRadius, y);
          context.arcTo(x, y, x, y + chairRadius, chairRadius);
          context.fillStyle = "#DDDDDD";
          context.fill();
          context.stroke();
        }

        // Chaise du haut
        context.save();
        context.translate(
          (width - chairWidth) / 2,
          tableY - chairHeight - chairPadding
        );
        drawChair(0, 0);
        context.restore();
        context.fillStrokeShape(shape);
        // Chaise du bas - rotation 180°
        context.save();
        context.translate(
          (width + chairWidth) / 2,
          tableY + tableSize + chairPadding + chairHeight
        );
        context.rotate(Math.PI);
        drawChair(0, 0);
        context.restore();
        context.fillStrokeShape(shape);
        // Chaise gauche - rotation 90°
        context.save();
        context.translate(tableX - chairPadding, (height + chairWidth) / 2);
        context.rotate(-Math.PI / 2);
        drawChair(0, 0);
        context.restore();
        context.fillStrokeShape(shape);
        // Chaise droite - rotation -90°
        context.save();
        context.translate(
          tableX + tableSize + chairPadding + chairHeight,
          (height - chairWidth) / 2
        );
        context.rotate(Math.PI / 2);
        drawChair(0, 0);
        context.restore();

        context.fillStrokeShape(shape);
      },
      fill: "transparent",
      stroke: "black",
      strokeWidth: 1,
    },
  },
  {
    name: "Table ronde",
    type: "round",
    config: {
      width: 150,
      height: 100,
      sceneFunc: function (context, shape) {
        const width = shape.width();
        const height = shape.height();

        // Table ronde
        context.beginPath();
        const tableRadius = Math.min(width, height) * 0.25;
        const centerX = width / 2;
        const centerY = height / 2;

        context.arc(centerX, centerY, tableRadius, 0, Math.PI * 2);
        context.fillStyle = "#DDDDDD";
        context.fill();
        context.stroke();
        context.fillStrokeShape(shape);
        // Dimensions des chaises
        const chairWidth = 20;
        const chairHeight = 15;
        const chairRadius = 6;
        const chairPadding = 5;

        // Fonction de dessin des chaises
        function drawChair(x, y) {
          context.beginPath();
          context.moveTo(x, y + chairRadius);
          context.lineTo(x, y + chairHeight);
          context.lineTo(x + chairWidth, y + chairHeight);
          context.lineTo(x + chairWidth, y + chairRadius);
          context.arcTo(
            x + chairWidth,
            y,
            x + chairWidth - chairRadius,
            y,
            chairRadius
          );
          context.lineTo(x + chairRadius, y);
          context.arcTo(x, y, x, y + chairRadius, chairRadius);
          context.fillStyle = "#DDDDDD";
          context.fill();
          context.stroke();
        }

        // Positionnement des chaises à équidistance autour du cercle
        const chairDistance = tableRadius + chairPadding;

        // Chaise 1 (haut)
        context.save();
        const chair1X = centerX - chairWidth / 2;
        const chair1Y = centerY - chairDistance - chairHeight + 1.5;
        drawChair(chair1X, chair1Y);
        context.restore();
        context.fillStrokeShape(shape);
        // Chaise 2 (bas droit, +120 degrés)
        context.save();
        context.translate(
          // centerX + Math.cos((Math.PI * 2) / 3) * chairDistance,
          // centerY + Math.sin((Math.PI * 2) / 4) * chairDistance
          47,
          57
        );
        context.rotate((Math.PI * 2) / 4.7 + Math.PI);
        drawChair(-chairWidth / 2, -chairHeight);
        context.restore();
        context.fillStrokeShape(shape);
        // Chaise 3 (bas gauche, -120 degrés)
        context.save();
        context.translate(
          // centerX + Math.cos((Math.PI * 4) / 3) * chairDistance,
          // centerY + Math.sin((Math.PI * 4) / 3) * chairDistance
          100,
          63
        );
        context.rotate((Math.PI * 4) / 2.4 + Math.PI);
        drawChair(-chairWidth / 2, -chairHeight);
        context.restore();

        context.fillStrokeShape(shape);
      },
      fill: "transparent",
      stroke: "black",
      strokeWidth: 1,
    },
  },
];

const addTable = (type) => {
  // Generate a unique ID for the table
  const id = "table-" + Date.now();

  // Add a new table to the center of the plan
  tables.value.push({
    id: id,
    type: type,
    x: layoutStageConfig.width / 2 - 75,
    y: layoutStageConfig.height / 2 - 50,
  });
};

const getTableConfig = (table) => {
  let config;

  // Sélectionne la configuration en fonction du type de table
  switch (table.type) {
    case "rect":
      config = Object.assign({}, shapesConfig[0].config);
      break;
    case "square":
      config = Object.assign({}, shapesConfig[1].config);
      break;
    case "round":
      config = Object.assign({}, shapesConfig[2].config);
      break;
    default:
      config = Object.assign({}, shapesConfig[0].config);
  }

  // Ajoute les coordonnées
  config.x = table.x;
  config.y = table.y;

  return config;
};

const handleDragStart = (e) => {
  // Save the dragged element's ID
  dragItemId.value = e.target.id();
};

const handleDragEnd = (e) => {
  // Update the table's position when drag ends
  if (dragItemId.value) {
    const index = tables.value.findIndex(
      (table) => table.id === dragItemId.value
    );

    if (index !== -1) {
      // Update position
      tables.value[index].x = e.target.x();
      tables.value[index].y = e.target.y();
    }

    dragItemId.value = null;
  }
};

const clearLayout = () => {
  tables.value = [];
};

onMounted(() => {
  const layoutContainer = document.querySelector(".layout-area");
  if (layoutContainer) {
    layoutStageConfig.width = layoutContainer.clientWidth;
    layoutStageConfig.height = layoutContainer.clientHeight;
  }

  // Redimensionnement lors du changement de taille de fenêtre
  window.addEventListener("resize", () => {
    if (layoutContainer) {
      layoutStageConfig.width = layoutContainer.clientWidth;
      layoutStageConfig.height = layoutContainer.clientHeight;
    }
  });
});

// Ajuste la taille du stage en fonction de la taille du conteneur
</script>

<style>
.cafe-app {
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
}

.sidebar {
  width: 200px;
  background-color: #f5f5f5;
  padding: 20px;
  border-right: 1px solid #ddd;
  overflow-y: auto;
}

.table-templates {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.template {
  cursor: pointer;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.template:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.template:active {
  transform: scale(0.98);
}

.template p {
  margin: 8px 0 0;
  font-size: 14px;
}

.cafe-layout {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 300px;
}

.layout-area {
  border: 2px dashed #aaa;
  background-color: #f9f9f9;
  flex: 1;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.controls {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
}

.control-btn {
  padding: 8px 16px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.control-btn:hover {
  background-color: #c0392b;
}

h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
}
</style>
