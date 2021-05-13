<template>
  <div id="app">
    <div v-if="loggedIn">logged in</div>
    <login @success="loggedIn = true" v-else />
  </div>
</template>

<script>
import Login from './pages/Login.vue'

export default {
  name: 'App',
  components: {
    Login
  },
  head: {
    link: [
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/bulma@0.9.2/css/bulma.min.css",
      },
    ],
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
