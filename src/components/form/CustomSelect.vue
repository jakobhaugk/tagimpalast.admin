<template>
  <div class="field">
    <label>{{ label }}</label>
    <div class="control">
      <div class="select">
        <select @input="$emit('input', $event.target.value)" :value="value">
          <option
            v-for="(option, idx) in options"
            :key="idx"
            :value="option"
            :selected="value === option"
          >
            {{ option }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    options: Array,
    label: String,
  },
};
</script>

<style>
</style>