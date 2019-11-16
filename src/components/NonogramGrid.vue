<template>
  <div
    class="nonogram-grid"
    :style="{
      'grid-template-columns': `[row-hints-start] max-content [row-hints-end draw-start] repeat(${cols}, 1fr) [draw-end]`,
      'grid-template-rows': `[col-hints-start] max-content [col-hints-end draw-start] repeat(${rows}, 1fr) [draw-end]`,
    }"
  >
    <div
      style="
        grid-row: col-hints-start / col-hints-end;
        grid-column: row-hints-start / row-hints-end;
        background: #FFE;
      "
    >
      <!-- Empty area -->
    </div>
    <div
      style="
        grid-column: draw-start / draw-end;
        grid-row: col-hints-start / col-hints-end;
        background: #ddd;
      "
    >
      <!--Col hints -->
    </div>
    <div
      style="
        grid-column: row-hints-start / row-hints-end;
        grid-row: draw-start / draw-end;
        background: #ddd;
      "
    >
      <!--Row hints -->
    </div>
    <div
      style="
        grid-area: draw;
        background: #eee;
      "
    >
      <!-- Draw area. -->
    </div>

    <NonogramHints
      v-for="(hints, x) in colHints"
      :key="'ch' + x"
      :x="x"
      :y="0"
      direction="col"
      :hints="hints"
      :style="{
        'grid-column': x + 2,
        'grid-row': 'col-hints-start / col-hints-end',
      }"
    />
    <NonogramHints
      v-for="(hints, y) in rowHints"
      :key="'rh' + y"
      :x="0"
      :y="y"
      direction="row"
      :hints="hints"
      :style="{
        'grid-column': 'row-hints-start / row-hints-end',
        'grid-row': y + 2,
      }"
    />
    <template v-for="(row, y) in matrix">
      <NonogramCell
        v-for="(cell, x) in row"
        :key="x + ',' + y"
        :x="x"
        :y="y"
        :value="cell"
      />
    </template>
  </div>
</template>

<style>
.nonogram-grid {
  display: inline-grid;
  gap: 1px;
}
</style>

<script>
import NonogramCell from "./NonogramCell.vue";
import NonogramHints from "./NonogramHints.vue";

export default {
  name: "NonogramGrid",
  components: { NonogramCell, NonogramHints },
  props: {
    colHints: {
      type: Array,
      required: true,
    },
    rowHints: {
      type: Array,
      required: true,
    },
    matrix: {
      type: Array,
      required: true,
    },
  },
  computed: {
    colHintsMaxLength() {
      return Math.max(...this.colHints.map(list => list.length));
    },
    rowHintsMaxLength() {
      return Math.max(...this.rowHints.map(list => list.length));
    },
    cols() {
      if (this.colHints.length != this.matrix[0].length) {
        console.error("Inconsistent number of cols for hints and grid.");
      }
      return Math.max(this.colHints.length, this.matrix[0].length);
    },
    rows() {
      if (this.rowHints.length != this.matrix.length) {
        console.error("Inconsistent number of rows for hints and grid.");
      }
      return Math.max(this.rowHints.length, this.matrix.length);
    },
  },
};
</script>
