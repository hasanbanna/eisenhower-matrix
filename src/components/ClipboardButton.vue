<template>
  <button
    :class="state"
    :disabled="state === 'disabled'"
    @click="$emit('on-click')"
  >
    <span v-if="state === 'success'">tasks copied!</span>
    <span v-else-if="state === 'error'">error with copying tasks</span>
    <span v-else>
      {{ text }}
    </span>
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
      validator: (value) =>
        ["", "success", "error", "disabled"].includes(value),
    },
  },
  watch: {
    state(value) {
      if (value === "success") {
        this.$emit("on-success");
      }
    },
  },
};
</script>

<style>
button {
  width: 100%;
  padding: 10px;
  cursor: pointer;
  font-size: 20px;
  font-weight: Regular;
  border-radius: 3px;
  border: 0;
  background-color: #3772ff;
  color: white;
  transition-duration: 0.3s;
  opacity: 0.9;
}
button:disabled,
button[disabled] {
  background-color: #3772ff;
  opacity: 0.5;
  cursor: not-allowed;
}
button:hover:enabled {
  opacity: 1;
}
.success {
  background-color: white;
  color: #3772ff;
}
</style>