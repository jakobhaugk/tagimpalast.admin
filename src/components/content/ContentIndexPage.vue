<template>
<div>
  <label>Template (Anzahl der Stunden durch '####' ersetzen)</label>
  <text-editor class="mb-3" v-model="value.template" />

  <label>Info Text (darunter)</label>
  <text-editor class="mb-3" v-model="value.infoText" />

  <div class="field">
    <label>Datum</label>
    <div class="control">
    <date-picker type="datetime" basic="datetime" v-model="value.countdownEnd" />
    </div>
  </div>
  <custom-input label="Ticker Text" v-model="value.ticker"></custom-input>
</div>
</template>

<script>
import TextEditor from '../editor/TextEditor.vue'
import CustomInput from '../form/CustomInput.vue'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css';

export default {
  components: { CustomInput, TextEditor, DatePicker },
  props: {
    value: { type: Object, default: { template: '', countdownEnd: Date.now(), ticker: '', infoText: '' } },
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