<template>
  <div id="app">
    <NonogramGrid
      :matrix="sampleGrid"
      :colHints="sampleColHints"
      :rowHints="sampleRowHints"
    />
    <TextareaWithLabel
      id="texthuman"
      v-model="puzzleDefinitionHumanReadable"
      @input="inputHumanReadable"
      rows="10"
    >
      <template v-slot:label>Easy-to-read:</template>
    </TextareaWithLabel>
    <TextareaWithLabel
      id="textsimon"
      v-model="puzzleDefinitionSimonTatham"
      @input="inputSimonTatham"
      rows="10"
    >
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
    <ul v-if="puzzleDefinitionErrors.length > 0">
      <li v-for="(error, index) in puzzleDefinitionErrors" :key="index">
        {{ error }}
      </li>
    </ul>
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
import {
  parsePuzzleText,
  stringifyPuzzleDefinitionAsSimonTathan,
  stringifyPuzzleDefinitionAsHumanReadable,
  validatePuzzleDefinition,
} from "./nonogram.js";

export default {
  name: "App",
  components: {
    NonogramGrid,
    TextareaWithLabel,
  },
  data() {
    return {
      puzzleDefinition: null,
      puzzleDefinitionErrors: [],
      // '',
      puzzleDefinitionSimonTatham:
        "15x15:1.2.6/2.3.6/4.1.5/7.4/3.4/4.2/4/4.1/6.2/5.1.2.3/3.1.5/1.5/3.5/3/5/2.1/2.2/9.1/10.1/11.1/2.1.4/1.4.1/1.2/2.1.2/2.1.2/3.1.3.1/5.3/5.4/6.5/6.5",
      puzzleDefinitionHumanReadable: "",

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
      return JSON.stringify(this.puzzleDefinition, null, 2);
    },
  },
  methods: {
    // TODO: Replace these with vuex.
    inputSimonTatham(value) {
      this.puzzleDefinition = parsePuzzleText(value);
      this.puzzleDefinitionHumanReadable = stringifyPuzzleDefinitionAsHumanReadable(
        this.puzzleDefinition
      );
      this.puzzleDefinitionErrors = validatePuzzleDefinition(
        this.puzzleDefinition
      );
    },
    inputHumanReadable(value) {
      this.puzzleDefinition = parsePuzzleText(value);
      this.puzzleDefinitionSimonTatham = stringifyPuzzleDefinitionAsSimonTathan(
        this.puzzleDefinition
      );
      this.puzzleDefinitionErrors = validatePuzzleDefinition(
        this.puzzleDefinition
      );
    },
  },
};
</script>
