<template>
<div>
  <custom-input label="Überschrift" v-model="value.heading"></custom-input>
  <div v-for="sponsor, idx in value.sponsors" :key="idx" class="box sponsor-item">
    <button @click="removeSponsor(idx)" class="button is-small is-danger is-outlined remove-btn">Förderer löschen</button><br>
    <custom-input label="Name" v-model="sponsor.name" />
    <custom-input label="Link (URL)" v-model="sponsor.url" />
    <image-upload @success="images => setImages(idx, images)" />
  </div>
  <button @click="addSponsor" class="button">+ Förderer hinzufügen</button>
</div>
</template>

<script>
import TextEditor from '../editor/TextEditor.vue'
import CustomInput from '../form/CustomInput.vue'
import ImageUpload from '../form/ImageUpload.vue'

export default {
  components: { CustomInput, TextEditor, ImageUpload },
  props: {
    value: { type: Object, default: { sponsors: []} },
  },
  watch: {
    value: function() {
      this.$emit('input', this.value)
    }
  },
  methods: {
    addSponsor() {
      const value = this.value;
      this.value = {
        ...value,
        sponsors: [
          ...this.value.sponsors || [],
          {}
        ]
      }
    },
    removeSponsor(idx) {
      this.value.sponsors.splice(idx, 1)
    },
    setImages(idx, [images]) {
      const value = this.value;
      value.sponsors[idx].logo = images;
      this.value = { ...value }
    }
  }
}
</script>

<style scoped>
.sponsor-item {
  display: flex !important;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
}
.sponsor-item div {
  margin-right: 0.5em;
}
.remove-btn {
  position: absolute;
  right: 0;
  top: 0;
}
</style>