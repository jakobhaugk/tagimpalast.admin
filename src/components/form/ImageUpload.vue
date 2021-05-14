<template>
  <div class="file">
    <label class="file-label">
    <input
    class="file-input"
      type="file"
      :multiple="multiple"
      accept="image/*"
      @change="upload($event)"
      id="file-input"
    >
    <span class="file-cta">
      <span class="file-label">Bild auswählen</span>
    </span>

    <div v-if="status" class="ml-3" :class="status === 'success' ? 'has-text-success' : 'has-text-danger'">
      {{ status === 'success' ? 'Erfolgreich hochgeladen' : 'Fehlgeschlagen' }}
    </div>
    </label>
  </div>

</template>

<script>
import http from "../../util/http";
export default {
  name: "ImageUpload",
  props: {
    multiple: { type: Boolean, default: false },
  },
  data: () => ({
    status: null,
  }),
  methods: {
    async upload(event) {
      const data = new FormData();
      data.append("name", "image");
      event.target.files.forEach((file, idx) => {
        data.append(`file${idx}`, file);
      });

      const res = await http.put("/api/image", data, {
        headers: {
          "Content-Type": "image/png",
        },
      });

      const {
        data: { data: uploaded, status, msg },
      } = res;

      this.status = status || 'failure';

      if (status === "success" && uploaded.length > 0) {
        this.$emit("success", uploaded);
      } else {
        this.$emit("failure", msg);
      }

      setTimeout(() => (this.status = null), 2000);
    },
  },
};
</script>

<style>
</style>