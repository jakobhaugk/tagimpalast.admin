<template>
  <div>
    <div
      v-for="(item, itemIdx) in value.galleryItems"
      :key="itemIdx"
      class="box gallery-item"
    >
      <button
        @click="removeItem(itemIdx)"
        class="button is-small is-danger is-outlined remove-btn"
      >
        Bild löschen</button
      ><br />
      <custom-input label="Titel" v-model="item.title" />
      <custom-input label="Künstler:in" v-model="item.artist" />
      <custom-select label="Größe des Vorschaubilds" v-model="item.size" :options="['default', 'small', 'medium', 'large']" />
      <image-upload class="mb-2" :multiple="true" @success="(images) => setImages(itemIdx, images)" />
      <div class="gallery-thumbs" style="flex-basis: 100%">
        <img v-for="img, imgIdx in item.images" :key="imgIdx" :src="`${$host}/images/${img}`" @click="setFirstImage(itemIdx, imgIdx)" >
      </div>
      <text-editor v-model="item.description" />
    </div>
    <button @click="addItem" class="button">+ Bild hinzufügen</button>
  </div>
</template>

<script>
import App from '../../App.vue';
import TextEditor from "../editor/TextEditor.vue";
import CustomInput from "../form/CustomInput.vue";
import CustomSelect from '../form/CustomSelect.vue';
import ImageUpload from "../form/ImageUpload.vue";

export default {
  components: { CustomInput, TextEditor, ImageUpload, App, CustomSelect },
  props: {
    value: {
      type: Object,
      default: { galleryItems: [] },
    },
  },
  watch: {
    value: function () {
      this.$emit("input", this.value);
    },
  },
  methods: {
    addItem() {
      const value = this.value;
      this.value = {
        ...value,
        galleryItems: [...(this.value.galleryItems || []), { images: [], size: 'default' }],
      };
    },
    removeItem(idx) {
      this.value.galleryItems.splice(idx, 1);
    },
    setImages(idx, images) {
      const value = this.value;
      value.galleryItems[idx].images = images;
      this.value = { ...value };
    },
    setFirstImage(itemIdx, imageIdx) {
      const items = this.value.galleryItems;
      const first = items[itemIdx].images[0];
      items[itemIdx].images[0] = items[itemIdx].images[imageIdx];
      items[itemIdx].images[imageIdx] = first;
      this.value = { ...this.value, galleryItems: items }
    }
  },
};
</script>

<style>
.gallery-item {
  display: flex !important;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
}
.gallery-item > div {
  margin-right: 0.5em;
  flex-grow: 1;
}
.gallery-thumbs {
  display: flex;
  column-gap: 0.5em;
  row-gap: 0.5em;
  margin-bottom: 0.5em;
  justify-content: start;
  align-items: flex-end;
}
.gallery-thumbs p {
  margin: 0;
}
.gallery-thumbs img {
  height: 100px;
  cursor: pointer;
}
.gallery-thumbs img:first-child {
  border: solid 3px red;
}
.remove-btn {
  position: absolute !important;
  right: 0;
  top: 0;
}
</style>