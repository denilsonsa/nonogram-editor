<template>
  <div class="nonogram-hints" :data-direction="direction">
    <span
      class="nonogram-hints--hint"
      v-for="(hint, index) in hints"
      :key="index"
      >{{ hint }}</span
    >
  </div>
</template>

<style>
.nonogram-hints {
  display: flex;
  justify-content: flex-end;
  align-items: stretch;
}
.nonogram-hints[data-direction="col"] {
  flex-direction: column;
}
.nonogram-hints[data-direction="row"] {
  flex-direction: row;
}

.nonogram-hints--hint {
  display: block;
  line-height: 1;
  flex: auto 0 0;
  padding: 0.5ch;
  width: 2ch;
  text-align: center;
  height: 1em;
}
/*
.nonogram-hints[data-direction="col"] > .nonogram-hints--hint {
}
.nonogram-hints[data-direction="row"] > .nonogram-hints--hint {
}
*/
</style>

<script>
export default {
  name: "NonogramHints",
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
    hints: {
      type: Array,
      required: true,
    },
    direction: {
      type: String,
      required: true,
    },
  },
};
</script>
