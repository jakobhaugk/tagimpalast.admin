<template>
  <div class="field">
    <label>{{ label }}</label>
    <div class="control">
      <input class="input" @input="$emit('input', $event.target.value)" :value="value">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    value: String,
  }
};
</script>

<style>
</style>