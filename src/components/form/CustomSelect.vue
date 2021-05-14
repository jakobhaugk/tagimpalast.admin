<template>
  <div class="field">
    <label>{{ label }}</label>
    <div class="control">
      <div class="select">
        <select @input="$emit('input', $event.target.value)">
          <option
            v-for="(option, idx) in options"
            :key="idx"
            :value="option"
            :selected="componentType === option"
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
    componentType: String,
    options: Array,
    label: String,
  },
};
</script>

<style>
</style>