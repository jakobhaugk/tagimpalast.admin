<template>
<div>
  <custom-input label="Überschrift" v-model="value.heading" />
  <text-editor v-model="value.html" :id="id" />
</div>
</template>

<script>
import TextEditor from '../editor/TextEditor.vue'
import CustomInput from '../form/CustomInput.vue'

export default {
  components: { CustomInput, TextEditor },
  props: {
    value: { type: Object, default: { heading: '', html: '' } },
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