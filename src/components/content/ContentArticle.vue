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
    value: { type: Object },
    id: String,
  },
  watch: {
    data: function() {
      this.$emit('input', data)
    }
  }
}
</script>

<style>

</style>