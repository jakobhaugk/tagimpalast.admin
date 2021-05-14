<template>
  <div class="section">
    <div class="top">
      <h1 class="title is-4">Seite bearbeiten</h1>
      <div>
        <button @click="deletePage" class="button mr-2 is-danger is-outlined">
          <span v-if="!deleteStatus">Löschen</span>
          <span v-else>{{
            deleteStatus === "success" ? "Gelöscht" : "Fehlgeschlagen"
          }}</span>
        </button>
        <button @click="updatePage" class="button is-link is-outlined">
          <span v-if="!saveStatus">Speichern</span>
          <span v-else>{{
            saveStatus === "success" ? "Gespeichert" : "Fehlgeschlagen"
          }}</span>
        </button>
      </div>
    </div>

    <div v-if="ready">
      <span v-if="error">Irgendetwas ist schiefgelaufen</span>
      <div v-else>
        <div class="box">
          <h6 class="title is-6">Allgemeine Einstellungen</h6>
          <custom-input :label="'Titel im Menü'" v-model="page.menuLabel" />
          <custom-select
            :label="'Seitentyp'"
            :options="['article', 'index-page']"
            v-model="page.componentType"
          />
          <custom-select
            label="Hintergrundfarbe"
            :options="['red', 'yellow', 'green', 'white', 'black']"
            v-model="page.backgroundColor"
          />
        </div>

        <div class="box">
          <h6 class="title is-6">Inhalt der Seite</h6>
          <component
            :is="`content-${page.componentType}`"
            :id="slug"
            v-model="page.componentData"
          ></component>
        </div>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import CustomSelect from "../components/form/CustomSelect.vue";
import CustomInput from "../components/form/CustomInput";

import ContentArticle from "../components/content/ContentArticle";

import globals from '../const'

import http from "../util/http";
export default {
  components: { CustomSelect, CustomInput, ContentArticle },
  name: "PageEditor",
  data: () => ({
    ready: false,
    error: false,
    page: { type: Object, default: () => ({}) },
    saveStatus: null,
    deleteStatus: null,
  }),
  props: {
    slug: String,
  },
  methods: {
    async getPage() {
      this.page = globals.emptyPage;

      if (this.slug !== "new") {

        const { data: { data }} = await http.get(`/api/page/${this.slug}`);
        if (!data) {
          this.error = true;
          return;
        }
        this.page = data;
      }

      this.ready = true;
    },
    async updatePage() {

      let res;
      const body = { page: this.page };

      if (this.slug === "new") {
        res = await http.put('/api/page', body)
        this.$emit('reload')
      }

      else 
        res = await http.post(`/api/page/${this.slug}`, body);
        
      console.log(res)
      const { data: { status }} = res;
      this.saveStatus = status;
      setTimeout(() => {
        this.saveStatus = null;
      }, 2000);
    },
    async deletePage() {
      const res = await http.delete(`/api/page/${this.slug}`);
      const { data: { status }} = res;
      this.deleteStatus = status;
      setTimeout(() => {
        this.deleteStatus = null;
      }, 2000);
    }
  },
  async mounted() {
    this.getPage();
  },
  watch: {
    $route() {
      this.error = false;
      this.getPage();
    },
  },
};
</script>

<style scoped>
.section {
  height: 100%;
}
.top {
  display: flex;
  justify-content: space-between;
}
</style>