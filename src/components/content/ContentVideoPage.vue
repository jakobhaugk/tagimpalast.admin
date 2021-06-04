<template>
  <div>
    <custom-input label="Titel" v-model="value.title" />
    <custom-input label="Video Einbettungscode (HTML)" v-model="value.videoHTML" />
    <span>Text unter dem Video</span>
    <text-editor v-model="value.caption" />
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
        title: "",
        videoHTML: "",
        caption: "",
      },
    },
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