<template>
<div>
  <text-editor v-model="value.html" />
</div>
</template>

<script>
import TextEditor from '../editor/TextEditor.vue'
import CustomInput from '../form/CustomInput.vue'

export default {
  components: { CustomInput, TextEditor },
  props: {
    value: { type: Object },
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