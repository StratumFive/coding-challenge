@@ -0,0 +1,67 @@
<template>
  <div class="grid-container">
    <div
      v-for="gridItem in gridItems"
      :key="gridItem.id"
      class="grid-item"
    >
      {{ gridItem.x }}, {{ gridItem.y }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'WorldGrid',

  computed: {
    gridItems () {
      return [
        { id: 1, x: 0, y: 3 },
        { id: 2, x: 1, y: 3 },
        { id: 3, x: 2, y: 3 },
        { id: 4, x: 3, y: 3 },
        { id: 5, x: 4, y: 3 },
        { id: 6, x: 5, y: 3 },
        { id: 7, x: 0, y: 2 },
        { id: 8, x: 1, y: 2 },
        { id: 9, x: 2, y: 2 },
        { id: 10, x: 3, y: 2 },
        { id: 11, x: 4, y: 2 },
        { id: 12, x: 5, y: 2 },
        { id: 13, x: 0, y: 1 },
        { id: 14, x: 1, y: 1 },
        { id: 15, x: 2, y: 1 },
        { id: 16, x: 3, y: 1 },
        { id: 17, x: 4, y: 1 },
        { id: 18, x: 5, y: 1 },
        { id: 19, x: 0, y: 0 },
        { id: 20, x: 1, y: 0 },
        { id: 21, x: 2, y: 0 },
        { id: 22, x: 3, y: 0 },
        { id: 23, x: 4, y: 0 },
        { id: 24, x: 5, y: 0 }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.grid-container {
  position: relative;
  display: inline-grid;
  grid-template-columns: 100px 100px 100px 100px 100px 100px;
  grid-template-rows: 100px 100px 100px 100px;
  grid-gap: 1px;
  background-color: #0F5E9C;
  padding: 1px;

  .grid-item {
    font-size: 12px;
    background-color: #B5D3E7;
    text-align: left;
    padding: 3px;
  }
}
</style>
