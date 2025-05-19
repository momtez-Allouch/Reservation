<template>
  <div class="app-container">
    <!-- Table Layout Visualization -->
    <div class="layout-wrapper">
      <div
        class="layout-container"
        ref="layoutContainer"
        @mousemove="onDragMove"
        @mouseup="onDragEnd"
        :style="{
          width: `${floorPlan.width}px`,
          height: `${floorPlan.height}px`,
        }"
      >
        <!-- Floor Plan Regions -->
        <div
          v-for="(region, index) in floorPlan.regions"
          :key="`region-${index}`"
          class="floor-region"
          :style="{
            left: `${region.x}px`,
            top: `${region.y}px`,
            width: `${region.width}px`,
            height: `${region.height}px`,
            borderRadius: region.type === 'round' ? '50%' : '0',
          }"
          :class="{ 'region-active': isEditingFloorPlan }"
          @mousedown="startRegionDrag($event, region)"
        >
          <div
            v-if="isEditingFloorPlan"
            class="region-resize-handle"
            @mousedown.stop="startRegionResize($event, region)"
          ></div>
        </div>

        <!-- Non-usable space overlay - rendered with dashes -->
        <div class="dashed-overlay" v-if="showDashedOverlay"></div>

        <!-- Tables -->
        <div
          v-for="table in tables"
          :key="table.id"
          class="table-container"
          :class="[
            getTableClass(table.capacity),
            `shape-${table.shape.toLowerCase()}`,
          ]"
          :style="{
            left: `${table.position.x}px`,
            top: `${table.position.y}px`,
            width: `${table.size}px`,
            height:
              table.shape === 'Rectangle'
                ? `${table.size * 0.7}px`
                : `${table.size}px`,
          }"
          @mousedown="startDrag($event, table)"
          :data-table-id="table.id"
        >
          <div class="table-label">Table #{{ table.id }}</div>
          <div class="people-count">
            <span class="icon">👥</span> {{ table.capacity }}
          </div>

          <!-- Display seats based on table position and available space -->
          <template
            v-for="position in ['top', 'right', 'bottom', 'left']"
            :key="position"
          >
            <div :class="`seats ${position}`">
              <div
                v-for="i in getSeatPositions(table, position)"
                :key="`${position}-${i}`"
                class="seat"
                :class="getSeatClass(table, position)"
              ></div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- Management Panel -->
    <div class="management-panel">
      <h2>Restaurant Management</h2>

      <!-- Floor Plan Management Tab -->
      <div v-if="managementTab === 'floorPlan'" class="panel-section">
        <h3>Floor Plan Editor</h3>

        <div class="form-group">
          <label>Plan Width (px)</label>
          <div class="input-with-buttons">
            <button @click="adjustPlanSize('width', -50)" class="btn-adjust">
              −
            </button>
            <input
              type="number"
              v-model.number="floorPlan.width"
              class="form-control"
              min="300"
              step="50"
            />
            <button @click="adjustPlanSize('width', 50)" class="btn-adjust">
              +
            </button>
          </div>
        </div>

        <div class="form-group">
          <label>Plan Height (px)</label>
          <div class="input-with-buttons">
            <button @click="adjustPlanSize('height', -50)" class="btn-adjust">
              −
            </button>
            <input
              type="number"
              v-model.number="floorPlan.height"
              class="form-control"
              min="300"
              step="50"
            />
            <button @click="adjustPlanSize('height', 50)" class="btn-adjust">
              +
            </button>
          </div>
        </div>

        <div class="form-group">
          <label>Background Color</label>
          <input
            type="color"
            v-model="floorPlan.backgroundColor"
            class="form-control color-input"
          />
        </div>

        <div class="region-management">
          <h4>Usable Regions</h4>
          <p class="region-help">
            Define areas where tables can be placed. Outside these areas will be
            shown with dashes.
          </p>

          <div class="region-list">
            <div
              v-for="(region, index) in floorPlan.regions"
              :key="`region-list-${index}`"
              class="region-item"
            >
              <span>Region {{ index + 1 }}</span>
              <div class="region-controls">
                <select v-model="region.type" class="region-type-select">
                  <option value="rectangle">Rectangle</option>
                  <option value="round">Round</option>
                </select>
                <button
                  @click="removeRegion(index)"
                  class="btn-small btn-danger"
                >
                  ×
                </button>
              </div>
            </div>
          </div>

          <button @click="addNewRegion" class="btn-secondary">
            Add Region
          </button>
        </div>

        <div class="button-group">
          <button
            @click="toggleFloorPlanEditing"
            class="btn-edit"
            :class="{ active: isEditingFloorPlan }"
          >
            {{ isEditingFloorPlan ? "Done Editing" : "Edit Regions" }}
          </button>
          <button @click="toggleDashedOverlay" class="btn-secondary">
            {{ showDashedOverlay ? "Hide Dashed Areas" : "Show Dashed Areas" }}
          </button>
        </div>

        <div class="toggle-tabs">
          <button @click="managementTab = 'tables'" class="toggle-tab-btn">
            Manage Tables
          </button>
        </div>
      </div>

      <!-- Table Management Tab -->
      <div v-if="managementTab === 'tables'" class="panel-section">
        <div v-if="editMode">
          <h3>Edit Table</h3>

          <div class="form-group">
            <label>Table Number</label>
            <input
              type="number"
              v-model.number="editingTable.id"
              class="form-control"
              min="1"
            />
          </div>

          <div class="form-group">
            <label>Capacity</label>
            <div class="input-with-buttons">
              <button @click="adjustCapacity(-1)" class="btn-adjust">−</button>
              <input
                type="number"
                v-model.number="editingTable.capacity"
                class="form-control capacity-input"
                min="0"
              />
              <button @click="adjustCapacity(1)" class="btn-adjust">+</button>
            </div>
          </div>

          <div class="form-group">
            <label>Shape</label>
            <select v-model="editingTable.shape" class="form-control">
              <option>Square</option>
              <option>Round</option>
              <option>Rectangle</option>
            </select>
          </div>

          <div class="form-group">
            <label>Size (px)</label>
            <div class="input-with-buttons">
              <button @click="adjustSize(-5)" class="btn-adjust">−</button>
              <input
                type="number"
                v-model.number="editingTable.size"
                class="form-control"
                min="40"
                step="5"
              />
              <button @click="adjustSize(5)" class="btn-adjust">+</button>
            </div>
          </div>

          <div class="form-group">
            <label>Location</label>
            <select v-model="editingTable.location" class="form-control">
              <option>Window</option>
              <option>Center</option>
              <option>Corner</option>
              <option>Bar</option>
            </select>
          </div>

          <div class="form-group">
            <label>Status</label>
            <select v-model="editingTable.status" class="form-control">
              <option>Available</option>
              <option>Occupied</option>
              <option>Reserved</option>
              <option>Out of Service</option>
            </select>
          </div>

          <div class="button-group">
            <button @click="saveTable" class="btn-save">Save</button>
            <button @click="cancelEdit" class="btn-cancel">Cancel</button>
          </div>

          <button v-if="!isNewTable" @click="deleteTable" class="btn-delete">
            Delete Table
          </button>
        </div>

        <div v-else class="button-group add-table-btn">
          <button @click="addNewTable" class="btn-add">Add New Table</button>
        </div>

        <div class="instructions">
          <p>
            <strong>Tip:</strong> Drag tables to rearrange them on the layout.
          </p>
          <p>Click on a table to edit its properties.</p>
        </div>

        <div class="toggle-tabs">
          <button @click="managementTab = 'floorPlan'" class="toggle-tab-btn">
            Manage Floor Plan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";

// Floor Plan State
const floorPlan = reactive({
  width: 600,
  height: 500,
  backgroundColor: "#f5f5f5",
  regions: [
    {
      x: 50,
      y: 50,
      width: 500,
      height: 400,
      type: "rectangle",
    },
  ],
});

const showDashedOverlay = ref(true);
const isEditingFloorPlan = ref(false);
const draggedRegion = ref(null);
const draggedRegionResize = ref(null);
const dragOffset = ref({ x: 0, y: 0 });
const managementTab = ref("tables");

// Table Management State
const tables = ref([
  {
    id: 1,
    capacity: 6,
    shape: "Rectangle",
    size: 100,
    location: "Center",
    status: "Available",
    position: { x: 80, y: 80 },
    color: "green",
  },
  {
    id: 2,
    capacity: 2,
    shape: "Round",
    size: 60,
    location: "Window",
    status: "Available",
    position: { x: 230, y: 80 },
    color: "red",
  },
  {
    id: 3,
    capacity: 4,
    shape: "Square",
    size: 80,
    location: "Corner",
    status: "Available",
    position: { x: 380, y: 80 },
    color: "green",
  },
  {
    id: 4,
    capacity: 3,
    shape: "Round",
    size: 70,
    location: "Window",
    status: "Reserved",
    position: { x: 80, y: 230 },
    color: "red",
  },
  {
    id: 5,
    capacity: 0,
    shape: "Square",
    size: 60,
    location: "Center",
    status: "Out of Service",
    position: { x: 230, y: 230 },
    color: "blue",
  },
  {
    id: 6,
    capacity: 7,
    shape: "Rectangle",
    size: 120,
    location: "Center",
    status: "Available",
    position: { x: 380, y: 230 },
    color: "green",
  },
]);

const editMode = ref(false);
const isNewTable = ref(false);
const editingTable = ref({});
const draggingTable = ref(null);
const draggingOffset = ref({ x: 0, y: 0 });
const layoutContainer = ref(null);

// Floor Plan Management Functions
const toggleFloorPlanEditing = () => {
  isEditingFloorPlan.value = !isEditingFloorPlan.value;
};

const toggleDashedOverlay = () => {
  showDashedOverlay.value = !showDashedOverlay.value;
};

const adjustPlanSize = (dimension, amount) => {
  const newValue = floorPlan[dimension] + amount;
  const minValue = 300;

  if (newValue >= minValue) {
    floorPlan[dimension] = newValue;
  }
};

const addNewRegion = () => {
  floorPlan.regions.push({
    x: 50,
    y: 50,
    width: 200,
    height: 150,
    type: "rectangle",
  });
};

const removeRegion = (index) => {
  if (floorPlan.regions.length > 1) {
    floorPlan.regions.splice(index, 1);
  } else {
    alert("You need at least one region in your floor plan.");
  }
};

const startRegionDrag = (event, region) => {
  if (!isEditingFloorPlan.value) return;
  event.preventDefault();

  draggedRegion.value = region;

  // Calculate offset for more natural dragging
  const rect = event.target.getBoundingClientRect();
  dragOffset.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
};

const startRegionResize = (event, region) => {
  if (!isEditingFloorPlan.value) return;
  event.preventDefault();

  draggedRegionResize.value = region;
};

// Table styling helpers
const getTableClass = (capacity) => {
  if (capacity <= 2) return "small-table";
  if (capacity >= 8) return "large-table";
  return "medium-table";
};

// Get seat positions based on table capacity and shape
const getSeatPositions = (table, position) => {
  if (table.capacity === 0) return 0;

  // Check if table is in a corner (simplified check)
  const isCorner = table.location === "Corner";

  // Basic allocation of seats based on capacity and table shape
  let seatCount = 0;

  if (table.shape === "Round") {
    // Distribute seats evenly
    switch (position) {
      case "top":
      case "bottom":
        seatCount = table.capacity <= 4 ? 1 : 2;
        break;
      case "left":
      case "right":
        seatCount = table.capacity <= 4 ? 1 : 2;
        break;
    }
  } else if (table.shape === "Rectangle") {
    // More seats on the long sides
    switch (position) {
      case "top":
      case "bottom":
        seatCount = Math.min(Math.ceil(table.capacity / 2), 3);
        break;
      case "left":
      case "right":
        seatCount = Math.min(Math.floor(table.capacity / 4), 2);
        break;
    }
  } else {
    // Square
    seatCount = Math.min(Math.ceil(table.capacity / 4), 2);
  }

  // Don't show chairs in corners for tables marked as corner location
  if (isCorner) {
    // This is a simplified approach - in a real app you'd check actual position
    if (
      (position === "top" || position === "bottom") &&
      table.position.x < 100
    ) {
      seatCount = 0;
    }
    if (
      (position === "left" || position === "right") &&
      table.position.y < 100
    ) {
      seatCount = 0;
    }
  }

  return seatCount;
};

const getSeatClass = (table, position) => {
  if (table.status === "Out of Service") return "empty";

  // Return different styling based on table color
  if (table.color === "green") {
    return "occupied green-theme";
  } else if (table.color === "red") {
    return "occupied orange-theme";
  }
  return "empty";
};

// Check if a position is within any defined floor plan region
const isPositionInFloorPlan = (x, y, width, height) => {
  // A point is considered inside if the entire table falls within a region
  for (const region of floorPlan.regions) {
    if (region.type === "rectangle") {
      // For rectangle regions, do a simple bounds check
      if (
        x >= region.x &&
        y >= region.y &&
        x + width <= region.x + region.width &&
        y + height <= region.y + region.height
      ) {
        return true;
      }
    } else if (region.type === "round") {
      // For round regions, check if the corners of the table are within the circle
      const centerX = region.x + region.width / 2;
      const centerY = region.y + region.height / 2;
      const radius = Math.min(region.width, region.height) / 2;

      // Check all four corners - simplified for usability
      const corners = [
        { x, y }, // Top left
        { x: x + width, y }, // Top right
        { x, y: y + height }, // Bottom left
        { x: x + width, y: y + height }, // Bottom right
      ];

      // All corners must be inside the circle
      for (const corner of corners) {
        const distance = Math.sqrt(
          Math.pow(corner.x - centerX, 2) + Math.pow(corner.y - centerY, 2)
        );
        if (distance > radius) {
          return false;
        }
      }

      return true;
    }
  }

  return false; // If not in any region, return false
};

// Table Management Functions
const addNewTable = () => {
  // Find the highest current table ID
  const maxId = tables.value.reduce((max, table) => Math.max(max, table.id), 0);

  // Create a new table with default values
  editingTable.value = {
    id: maxId + 1,
    capacity: 4,
    shape: "Square",
    size: 80,
    location: "Center",
    status: "Available",
    position: { x: 100, y: 100 },
    color: "green",
  };

  isNewTable.value = true;
  editMode.value = true;
};

const editTable = (table) => {
  // Create a deep copy to avoid direct reference modification
  editingTable.value = JSON.parse(JSON.stringify(table));
  isNewTable.value = false;
  editMode.value = true;
};

const saveTable = () => {
  if (isNewTable.value) {
    // Add new table
    tables.value.push(JSON.parse(JSON.stringify(editingTable.value)));
  } else {
    // Update existing table
    const index = tables.value.findIndex((t) => t.id === editingTable.value.id);
    if (index !== -1) {
      tables.value[index] = JSON.parse(JSON.stringify(editingTable.value));
    }
  }

  cancelEdit();
};

const cancelEdit = () => {
  editMode.value = false;
  editingTable.value = {};
};

const deleteTable = () => {
  if (confirm("Are you sure you want to delete this table?")) {
    const index = tables.value.findIndex((t) => t.id === editingTable.value.id);
    if (index !== -1) {
      tables.value.splice(index, 1);
    }
    cancelEdit();
  }
};

const adjustCapacity = (amount) => {
  const newValue = editingTable.value.capacity + amount;
  if (newValue >= 0) {
    editingTable.value.capacity = newValue;
  }
};

const adjustSize = (amount) => {
  const newValue = editingTable.value.size + amount;
  if (newValue >= 40) {
    editingTable.value.size = newValue;
  }
};

// Drag and Drop Functionality
const startDrag = (event, table) => {
  if (editMode.value || isEditingFloorPlan.value) return;

  // Prevent default to stop text selection
  event.preventDefault();

  // Store the table we're dragging
  draggingTable.value = table;

  // Calculate the offset from the mouse to the top-left of the table
  const rect = event.target.getBoundingClientRect();
  draggingOffset.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };

  // Add the dragging class
  event.target.classList.add("dragging");
};

const onDragMove = (event) => {
  // Handle region dragging during floor plan edit
  if (draggedRegion.value && isEditingFloorPlan.value) {
    const containerRect = layoutContainer.value.getBoundingClientRect();
    const newX = event.clientX - containerRect.left - dragOffset.value.x;
    const newY = event.clientY - containerRect.top - dragOffset.value.y;

    // Constrain to container bounds
    draggedRegion.value.x = Math.max(
      0,
      Math.min(newX, floorPlan.width - draggedRegion.value.width)
    );
    draggedRegion.value.y = Math.max(
      0,
      Math.min(newY, floorPlan.height - draggedRegion.value.height)
    );
    return;
  }

  // Handle region resizing during floor plan edit
  if (draggedRegionResize.value && isEditingFloorPlan.value) {
    const containerRect = layoutContainer.value.getBoundingClientRect();
    const newWidth =
      event.clientX - containerRect.left - draggedRegionResize.value.x;
    const newHeight =
      event.clientY - containerRect.top - draggedRegionResize.value.y;

    // Ensure minimum size and constrain to container
    draggedRegionResize.value.width = Math.max(
      50,
      Math.min(newWidth, floorPlan.width - draggedRegionResize.value.x)
    );
    draggedRegionResize.value.height = Math.max(
      50,
      Math.min(newHeight, floorPlan.height - draggedRegionResize.value.y)
    );
    return;
  }

  // Handle table dragging
  if (!draggingTable.value) return;

  // Calculate new position
  const containerRect = layoutContainer.value.getBoundingClientRect();

  // Calculate position relative to container
  const newX = event.clientX - containerRect.left - draggingOffset.value.x;
  const newY = event.clientY - containerRect.top - draggingOffset.value.y;

  // Check boundaries and ensure we don't place on top of other tables
  const tableSize = draggingTable.value.size;
  const tableHeight =
    draggingTable.value.shape === "Rectangle" ? tableSize * 0.7 : tableSize;

  // Constrain to container bounds
  const maxX = floorPlan.width - tableSize;
  const maxY = floorPlan.height - tableHeight;

  let constrainedX = Math.max(0, Math.min(newX, maxX));
  let constrainedY = Math.max(0, Math.min(newY, maxY));

  // Check collision with other tables
  let hasCollision = false;
  tables.value.forEach((otherTable) => {
    if (otherTable.id !== draggingTable.value.id) {
      // Check if the tables would overlap
      const otherLeft = otherTable.position.x;
      const otherRight = otherTable.position.x + otherTable.size;
      const otherTop = otherTable.position.y;
      const otherBottom =
        otherTable.position.y +
        (otherTable.shape === "Rectangle"
          ? otherTable.size * 0.7
          : otherTable.size);

      const newRight = constrainedX + tableSize;
      const newBottom = constrainedY + tableHeight;

      if (
        constrainedX < otherRight &&
        newRight > otherLeft &&
        constrainedY < otherBottom &&
        newBottom > otherTop
      ) {
        hasCollision = true;
      }
    }
  });

  // Check if the table is within a defined floor plan region
  const isInFloorPlan = isPositionInFloorPlan(
    constrainedX,
    constrainedY,
    tableSize,
    tableHeight
  );

  // Only update if no collision and within floor plan (if overlay is shown)
  if (!hasCollision && (!showDashedOverlay.value || isInFloorPlan)) {
    draggingTable.value.position.x = constrainedX;
    draggingTable.value.position.y = constrainedY;

    // Check if table is in a corner now
    if (constrainedX < 50 && constrainedY < 50) {
      draggingTable.value.location = "Corner";
    } else if (constrainedX < 50 || constrainedY < 50) {
      draggingTable.value.location = "Wall";
    } else {
      draggingTable.value.location = "Center";
    }
  }
};

const onDragEnd = (event) => {
  // End region drag or resize
  if (draggedRegion.value || draggedRegionResize.value) {
    draggedRegion.value = null;
    draggedRegionResize.value = null;
    return;
  }

  // End table drag
  if (!draggingTable.value) return;

  // Remove dragging class from the element
  const tableElement = document.querySelector(
    `[data-table-id="${draggingTable.value.id}"]`
  );
  if (tableElement) {
    tableElement.classList.remove("dragging");
  }

  // Reset dragging state
  draggingTable.value = null;
};

// Initialize
onMounted(() => {
  // Set up click handler for editing tables
  layoutContainer.value.addEventListener("click", (event) => {
    if (isEditingFloorPlan.value) return; // Don't edit tables when editing floor plan
    if (draggingTable.value) return; // Don't edit if we just finished dragging

    // Find the table element clicked
    let tableElement = event.target;
    while (
      tableElement &&
      !tableElement.classList.contains("table-container")
    ) {
      tableElement = tableElement.parentElement;
      if (!tableElement || tableElement === layoutContainer.value) {
        tableElement = null;
        break;
      }
    }

    if (tableElement) {
      const tableId = parseInt(tableElement.getAttribute("data-table-id"));
      const table = tables.value.find((t) => t.id === tableId);
      if (table) {
        editTable(table);
      }
    }
  });
});
</script>

<style scoped>
.app-container {
  display: flex;
  gap: 20px;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.layout-wrapper {
  position: relative;
  min-width: 300px;
  min-height: 300px;
  border: 1px solid #ccc;
  overflow: hidden;
}

.layout-container {
  position: relative;
  overflow: hidden;
  transition: width 0.3s, height 0.3s, background-color 0.3s;
}

/* Floor Plan Regions */
.floor-region {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid #ddd;
  z-index: 10;
}

.region-active {
  border: 2px dashed #2196f3;
  cursor: move;
}

.region-resize-handle {
  position: absolute;
  width: 14px;
  height: 14px;
  background-color: #2196f3;
  border-radius: 50%;
  bottom: -7px;
  right: -7px;
  cursor: nwse-resize;
  z-index: 20;
}

.dashed-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: repeating-linear-gradient(
    45deg,
    rgba(0, 0, 0, 0.05),
    rgba(0, 0, 0, 0.05) 10px,
    rgba(0, 0, 0, 0.1) 10px,
    rgba(0, 0, 0, 0.1) 20px
  );
  pointer-events: none;
  z-index: 5;
}

.table-container {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: move;
  user-select: none;
  transition: box-shadow 0.2s;
  z-index: 15;
}

.table-container:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.shape-round {
  border-radius: 50%;
}

.shape-square {
  border-radius: 4px;
}

.shape-rectangle {
  border-radius: 4px;
}

.small-table {
  background-color: rgba(255, 193, 183, 0.7);
}

.medium-table {
  background-color: rgba(152, 223, 214, 0.7);
}

.large-table {
  background-color: rgba(152, 223, 214, 0.7);
}

.table-label {
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 2px;
}

.people-count {
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 2px;
}

.icon {
  font-size: 11px;
}

/* Seat positioning */
.seats {
  position: absolute;
  display: flex;
}

.top,
.bottom {
  left: 0;
  right: 0;
  justify-content: space-around;
}

.left,
.right {
  top: 0;
  bottom: 0;
  flex-direction: column;
  justify-content: space-around;
}

.top {
  top: -10px;
}

.bottom {
  bottom: -10px;
}

.left {
  left: -10px;
}

.right {
  right: -10px;
}

/* Seat styles */
.seat {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #f0f0f0;
}

.occupied {
  background-color: #333;
}

.green-theme {
  background-color: #006064;
}

.orange-theme {
  background-color: #bf360c;
}

.empty {
  background-color: #e0e0e0;
}

.dragging {
  opacity: 0.8;
  z-index: 100;
}

/* Management Panel */
.management-panel {
  flex-grow: 1;
  background-color: #f7f7f7;
  border-radius: 4px;
  padding: 15px;
  max-width: 350px;
}

.management-panel h2 {
  margin-top: 0;
  font-size: 18px;
  color: #333;
}

.management-panel h3 {
  font-size: 16px;
  margin-bottom: 15px;
  color: #444;
}

.form-group {
  margin-bottom: 12px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: #555;
}

.form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.input-with-buttons {
  display: flex;
  align-items: center;
}

.capacity-input {
  text-align: center;
}

.btn-adjust {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  cursor: pointer;
}

.btn-adjust:first-child {
  border-radius: 4px 0 0 4px;
}

.btn-adjust:last-child {
  border-radius: 0 4px 4px 0;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.btn-save {
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  flex-grow: 1;
}

.btn-cancel {
  background-color: #e0e0e0;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  flex-grow: 1;
}

.btn-delete {
  width: 100%;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  margin-top: 10px;
  cursor: pointer;
}

.btn-add {
  width: 100%;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 16px;
  cursor: pointer;
}

.instructions {
  margin-top: 20px;
  font-size: 13px;
  color: #666;
}

.add-table-btn {
  display: flex;
  margin-top: 15px;
}
</style>
