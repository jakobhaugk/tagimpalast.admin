<template>
  <div class="section">
    <div class="top">
      <h1 class="title is-4">Seite bearbeiten</h1>
      <div>
        <button @click="deletePage" class="button mr-2 is-danger is-outlined">
          <span v-if="!deleteStatus">Seite löschen</span>
          <span v-else>{{
            deleteStatus === "success" ? "Gelöscht" : "Fehlgeschlagen"
          }}</span>
        </button>
        <button @click="updatePage" class="button is-outlined is-link">
          <span v-if="!saveStatus">Speichern</span>
          <span v-else>{{
            saveStatus === "success" ? "Gespeichert" : "Fehlgeschlagen"
          }}</span>
        </button>
      </div>
    </div>

    <div v-if="ready" :key="slug">
      <span v-if="error">Irgendetwas ist schiefgelaufen</span>
      <div v-else>
        <div class="box">
          <h6 class="title is-6">Allgemeine Einstellungen</h6>
          <label class="checkbox">
              <input type="checkbox" v-model="page.public" value="true">
              Öffentlich
            </label>
          <custom-input :label="'Titel im Menü'" v-model="page.menuLabel" />
          
          <custom-select
            label="Hintergrundfarbe"
            :options="availableColors"
            v-model="page.backgroundColor"
          />
        </div>

        <div v-for="component, idx in page.components" :key="component._id" class="box">
          <div style="display: flex" class="is-justify-content-space-between">
            <h6 class="title is-6">{{ component.type }}</h6>
            <label class="checkbox">
              <input type="checkbox" v-model="component.public">
              Öffentlich
            </label>
            <button @click="page.components.splice(idx, 1)" class="button is-small is-danger is-outlined">
              Abschnitt löschen
            </button>
          </div>
          <custom-select
            :label="'Abschnittstyp'"
            :options="availableComponents"
            v-model="component.type"
          />
          <component
            :key="component._id"
            :is="`content-${component.type}-page`"
            v-model="component.data"
            :value="component.data"
          ></component>
        </div>

        <button @click="page.components.push(emptyComponent())" class="button is-outlined is-link">
          + Neuen Abschnitt hinzufügen
        </button>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import CustomSelect from "../components/form/CustomSelect.vue";
import CustomInput from "../components/form/CustomInput";

import ContentArticlePage from "../components/content/ContentArticlePage";
import ContentIndexPage from "../components/content/ContentIndexPage";
import ContentSponsorsPage from "../components/content/ContentSponsorsPage";
import ContentImagePage from "../components/content/ContentImagePage";

import globals from '../const'

import http from "../util/http";
export default {
  components: { CustomSelect, CustomInput, ContentArticlePage, ContentIndexPage, ContentSponsorsPage, ContentImagePage },
  name: "PageEditor",
  data: () => ({
    ready: false,
    error: false,
    page: { type: Object, default: () => globals.emptyPage },
    saveStatus: null,
    deleteStatus: null,
    availableComponents: globals.availableComponents,
    availableColors: globals.availableColors,
    emptyComponent: globals.emptyComponent,
  }),
  props: {
    slug: String,
  },
  methods: {
    async getPage() {
      this.ready = false;

      const { data: { data }} = await http.get(`/api/page/${this.slug}`);
      if (!data) {
        this.error = true;
        return;
      }
      this.page = data;

      this.ready = true;
    },
    async updatePage() {

      if (!this.page.menuLabel) return;

      let res;
      const body = { page: this.page };

      if (this.slug === "new") {
        res = await http.put('/api/page', body)
        this.$emit('reload')
        this.$router.push('/')
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
      this.$emit('reload')
      this.$router.push('/')
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
  min-height: 100%;
}
.top {
  display: flex;
  justify-content: space-between;
}
</style>