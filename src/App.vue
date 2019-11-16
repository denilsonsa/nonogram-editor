<template>
  <div id="app">
    <NonogramGrid
      :matrix="sampleGrid"
      :colHints="sampleColHints"
      :rowHints="sampleRowHints"
    />
    <TextareaWithLabel id="texthuman" v-model="sampleText" rows="10">
      <template v-slot:label>Easy-to-read:</template>
    </TextareaWithLabel>
    <TextareaWithLabel id="textsimon" v-model="sampleText" rows="10">
      <template v-slot:label>
        <a
          href="https://www.chiark.greenend.org.uk/~sgtatham/puzzles/js/pattern.html"
          >Simon Tatham's Portable Puzzle Collection</a
        >-compatible:
      </template>
    </TextareaWithLabel>
    <TextareaWithLabel
      id="texthuman"
      :value="parsedTextForDebugging"
      readonly="true"
      rows="10"
    >
      <template v-slot:label>Parsed version:</template>
    </TextareaWithLabel>
  </div>
</template>

<style>
#app {
  font-family: sans-serif;
}
</style>

<script>
import NonogramGrid from "./components/NonogramGrid.vue";
import TextareaWithLabel from "./components/TextareaWithLabel.vue";

export default {
  name: "App",
  components: {
    NonogramGrid,
    TextareaWithLabel,
  },
  data() {
    return {
      sampleText:
        "15x15:1.2.6/2.3.6/4.1.5/7.4/3.4/4.2/4/4.1/6.2/5.1.2.3/3.1.5/1.5/3.5/3/5/2.1/2.2/9.1/10.1/11.1/2.1.4/1.4.1/1.2/2.1.2/2.1.2/3.1.3.1/5.3/5.4/6.5/6.5",
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
  computed: {
    parsedTextForDebugging() {
      return JSON.stringify(this.parsePuzzleText(this.sampleText), null, 2);
    },
  },
  methods: {
    // TODO: Write down another (two) function(s) to generate the text from a puzzle object.
    // TODO: Move these functions to a "lib".
    parsePuzzleText(text) {
      // Splitting the dimensions from the hints.
      const [
        ,
        width,
        height,
        hintstring,
      ] = /^\s*(\d+)\s*x\s*(\d+)\s*:?\s*([\d \t.,\r\n;\/]+)\s*$/.exec(text) || [
        "",
        0,
        0,
        "",
      ];
      // Spliting into each line (either row or col) of hints.
      // Also filtering the empty lines.
      const hintlines = hintstring
        .split(/[\r\n;\/]+/)
        .filter(line => line.trim());
      // Splitting each line into each individual hint, and converting to integer.
      const hints = hintlines.map(line =>
        line
          .split(/[ \t.,]+/)
          .filter(hint => hint.trim())
          .map(hint => parseInt(hint, 10))
      );
      const colHints = hints.slice(0, width);
      const rowHints = hints.slice(width);
      // TODO: Detect and report errors, such as:
      // * ERROR: (width + height) != hints.length
      // * ERROR/WARN: sum(sum(hints) for colHints) != sum(sum(hints) for rowHints)
      // * WARN: Dimensions outside the valid range (1..99) (99 just because of display reasons, because I don't want to display 3-digit numbers)
      // * LATER: any(sum(hints) + hints.length - 1 > height for colHints) -> This would be easily detected when trying to solve the puzzle; so we can wait to detect/report this later.
      return {
        width,
        height,
        colHints,
        rowHints,
      };
    },
  },
};
</script>
