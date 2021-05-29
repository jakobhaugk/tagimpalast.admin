<template>
  <div style="dispay: flex">
    <text-editor label="Überschrift" v-model="value.heading" />
    <custom-input label="Stream ID" v-model="value.streamID" />
    <label class="checkbox">
      <input type="checkbox" v-model="value.enableChat" value="true" />
      Chat aktivieren
    </label>
    <custom-input v-if="value.enableChat" label="Chat Überschrift" v-model="value.chatHeading" />
    <span>Text unter dem Livestream</span>
    <text-editor v-model="value.html" :v-html="id" />
  </div>
</template>

<script>
import TextEditor from "../editor/TextEditor.vue";
import CustomInput from "../form/CustomInput.vue";

export default {
  components: { CustomInput, TextEditor },
  props: {
    value: {
      type: Object,
      default: {
        heading: "",
        streamID: "",
        html: "",
        enableChat: true,
        chatHeading: "",
        chatMaxChars: 1500,
      },
    },
    id: String,
  },
  watch: {
    value: function () {
      this.$emit("input", this.value);
    },
  },
};
</script>

<style>

</style>