<template>
  <div class="textarea-with-label">
    <label :for="internalid">
      <slot name="label"></slot>
    </label>
    <textarea
      :id="internalid"
      :value="value"
      @input="inputHandler"
      v-bind="$attrs"
      v-on="otherListeners"
    ></textarea>
  </div>
</template>

<style>
.textarea-with-label {
  display: inline-block;
  /* Make this inline-flex, so that the textarea expands to fit all height (minus the space used by the label). */
}
.textarea-with-label > label {
  display: block;
}
.textarea-with-label > textarea {
  display: block;
  width: 100%;
  box-sizing: border-box;
}
</style>

<script>
export default {
  name: "TextareaWithLabel",
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      required: false,
    },
    value: {
      type: String,
      required: false,
      default: "",
    },
  },
  data() {
    return {
      randomid: "TextareaWithLabel" + Math.random(),
    };
  },
  computed: {
    internalid() {
      return this.id || this.randomid;
    },
    otherListeners() {
      // Inspired by https://zendev.com/2018/05/31/transparent-wrapper-components-in-vue.html
      const { input, ...rest } = this.$listeners;
      return rest;
    },
  },
  methods: {
    inputHandler(event) {
      this.$emit("input", event.target.value);
    },
  },
};
</script>
