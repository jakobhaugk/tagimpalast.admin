<template>
  <div class="section" style="height: 100%">
    <div v-if="ready" style="height: 100%; position: relative">
      <h1 class="title is-3">Seiten</h1>
      <router-link class="nav-item mb-3"
        v-for="(page, idx) in pages"
        :key="idx"
        :to="`/${page.slug}`"
      >
        {{ page.menuLabel }}
      </router-link>
      <router-link class="nav-item mt-5" to="/new">
        + Neue Seite hinzufügen
      </router-link>
      <a :href="previewURL" target="_blank" class="preview-btn button is-info is-outlined">
        Vorschau
      </a>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import http from '../util/http'

export default {
  data: () => ({
    ready: false,
    pages: [],
    previewURL: process.env.VUE_APP_PREVIEW_URL,
  }),
  methods: {
    async init() {
      this.ready = false;
      const { data: { data } } = await http.get('/api/pages');
      console.log(data);
      this.pages = data;
      this.ready = true;
    }
  },
  async mounted() {
    this.init();
  },
  
};
</script>

<style>
.nav-item {
  display: block;
}
.preview-btn {
  position: absolute !important;
  left: 0;
  bottom: 0;
}
</style>