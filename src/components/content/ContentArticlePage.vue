<template>
<div>
  <custom-input label="Überschrift" v-model="value.heading" />
  <label class="checkbox">
    <input type="checkbox" v-model="value.indentFirstLine" value="true">
    Erste Zeile einrücken
  </label>
  <text-editor v-model="value.html" :id="id" />
</div>
</template>

<script>
import TextEditor from '../editor/TextEditor.vue'
import CustomInput from '../form/CustomInput.vue'

export default {
  components: { CustomInput, TextEditor },
  props: {
    value: { type: Object, default: { heading: '', html: '', indentFirstLine: true } },
    id: String,
  },
  watch: {
    value: function() {
      this.$emit('input', this.value)
    }
  }
}
</script>

<style>

</style>