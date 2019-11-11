<template>
  <div
    class="nonogram-cell"
    :style="{
      'grid-column-start': x + 2,
      'grid-column-end': x + 3,
      'grid-row-start': y + 2,
      'grid-row-end': y + 3,
    }"
    :data-x="x"
    :data-y="y"
  >{{value}}</div>
</template>

<style>
.nonogram-cell {
  line-height: 1;
  min-width: 1em;
  min-height: 1em;
  /* border: 2px solid #CCC; */

  /* Displaying the (debug) text at the center. */
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<script>
export default {
  name: "NonogramCell",
  props: {
    x: {
      type: Number,
      required: true,
      validator: Number.isInteger,
    },
    y: {
      type: Number,
      required: true,
      validator: Number.isInteger,
    },
    value: {
      type: Number,
      required: true,
      validator: Number.isInteger,
    },
  },
};
</script>