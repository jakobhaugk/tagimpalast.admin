<template>
  <div id="app" class="container is-fullhd">
    <div v-if="ready" style="height: 100%">
      <div v-if="loggedIn" class="flex-container">
        <button class="button is-small btn-toggle" @click="toggleMenuCollapse">
          {{ menuCollapsed ? "Menü anzeigen" : "Menü einklappen" }}
        </button>
        <div class="sidebar" v-if="!menuCollapsed">
          <sidebar ref="sidebar"></sidebar>
        </div>
        <div class="content">
          <router-view :key="$route.path" @reload="handleReload"></router-view>
        </div>
      </div>
      <div v-else>
        <login @success="loggedIn = true"></login>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import http from "./util/http";
import Sidebar from "./components/TheSidebar";
import Login from "./pages/Login";

export default {
  name: "App",
  components: {
    Sidebar,
    Login,
  },
  data: () => ({
    ready: false,
    loggedIn: false,
    menuCollapsed: false
  }),
  head: {
    link: [
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/bulma@0.9.2/css/bulma.min.css",
      },
    ],
  },
  async mounted() {
    try {
      const {
        data: { data },
      } = await http.get("/api/user");
      this.loggedIn = data === true;
    } catch (e) {
      this.loggedIn = false;
    }

    this.ready = true;
  },
  methods: {
    handleReload() {
      console.log("reload");
      this.$refs.sidebar.init();
    },
    toggleMenuCollapse() {
      this.menuCollapsed = !this.menuCollapsed;
    }
  },
};
</script>

<style>
body {
  position: absolute;
  height: 100%;
  width: 100%;
}
#app {
  height: 100%;
}
.flex-container {
  height: 100%;
  display: flex;
}
.sidebar {
  min-width: 240px;
  height: 100%;
  background-color: #e4e4e4;
  box-shadow: #bdbdbd 0px 0px 15px;
  overflow: hidden;
  z-index: 10;
}
@media screen and (max-width: 650px) {
  .sidebar {
    position: absolute;
  }
}

.content {
  flex: 1;
  overflow: auto;
}

.btn-toggle {
  position: absolute !important;
  top: 1rem;
  left: 1rem;
  z-index: 100;
}


</style>
