<template>
  <div class="container">
    <div class="box">
    <h1 class="title">Anmelden</h1>
    <input v-model="username" placeholder="Benutzername" /><br>
    <input v-model="password" type="password" placeholder="Passwort" /><br>
    <span v-if="error">{{ error }}</span><br>
    <button @click="login">Anmelden</button>
    </div>
  </div>
</template>

<script>
import http from '../util/http'

export default {
  name: 'Login',
  data: () => ({
    username: '',
    password: '',
    error: ''
  }),
  methods: {
    async login() {
      
      const { username, password } = this;
      const { data: { accessToken } } = await http.post('/login', { user: { username, password }});
      if (accessToken) {
        localStorage.setItem('user-token', accessToken)
        this.$router.push('/')
      }
      else
        this.error = 'Benutzername oder Passwort ungültig'
    }
  } 
};
</script>

<style>
</style>