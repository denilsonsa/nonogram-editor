<template>
  <div id="app">
    <NonogramGrid :matrix="sampleGrid" :colHints="sampleColHints" :rowHints="sampleRowHints" />
  </div>
</template>

<style>
#app {
  font-family: sans-serif;
}
</style>

<script>
import NonogramGrid from "./components/NonogramGrid.vue";

export default {
  name: "App",
  components: {
    NonogramGrid,
  },
  data() {
    return {
      sampleColHints: [[0], [1, 2], [5], [4]],
      sampleRowHints: [[2], [3], [2], [1, 1, 3], [2]],
      sampleGrid: [
        [0, 0, 1, 1],
        [0, 2, 1, 1],
        [0, 0, 2, 1],
        [0, 1, 2, 1],
        [0, 2, 1, 0],
      ],
    };
  },
};
</script>
