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
      <custom-input label="Name" v-model="item.name" />
      <custom-input label="Einbettungscode" v-model="item.videoEmbedding" />
      <image-upload class="mb-2" @success="(images) => setImage(itemIdx, images)" />
      <div class="gallery-thumbs" style="flex-basis: 100%">
        <img :src="`${$host}/images/${item.image}`" >
      </div>
      <text-editor v-model="item.description" />
    </div>
    <button @click="addItem" class="button">+ Video hinzufügen</button>
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
        galleryItems: [...(this.value.galleryItems || []), { image: null }],
      };
    },
    removeItem(idx) {
      this.value.galleryItems.splice(idx, 1);
    },
    setImage(idx, images) {
      const [image] = images;
      const value = this.value;
      value.galleryItems[idx].image = image;
      this.value = { ...value };
    },
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
  justify-content: flex-start;
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