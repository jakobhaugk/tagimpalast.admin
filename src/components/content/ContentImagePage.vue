<template>
<div>
  <div class="img mb-2">
    <img v-if="imageURL" :src="`${$host}/images/${imageURL}`">
    <span v-else>Kein Bild ausgewählt</span>
  </div>
  <div class="controls">
    <custom-input label="Bildunterschrift" v-model="value.caption" />
    <image-upload @success="setImages" :multiple="false"/>
  </div>
</div>
</template>

<script>
import TextEditor from "../editor/TextEditor.vue";
import CustomInput from "../form/CustomInput.vue";
import ImageUpload from "../form/ImageUpload.vue";

export default {
  components: { CustomInput, TextEditor, ImageUpload },
  props: {
    value: { type: Object, default: { file: null, caption: ''} },
    showPreview: { type: Boolean, default: false }
  },
  data() {
    return {
      imageURL: null
    }
  },
  mounted() {
    this.imageURL = this.value.file
  },
  watch: {
    value: function () {
      this.$emit("input", this.value);
    },
  },
  methods: {
    setImages([image]) {
      if (image) {
        this.value.file = image;
        this.imageURL = image
      }
    },
  },
};
</script>

<style scoped>
.controls {
  display: flex;
  align-items: center;
  column-gap: 2em;
}
img {
  max-height: 200px;
}
</style>