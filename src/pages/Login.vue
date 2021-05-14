<template>
  <div class="container">
    <div class="box">

      <div class="field">
          <div class="control">
            <input class="input" v-model="username" placeholder="Benutzername">
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input class="input" v-model="password" type="password" placeholder="Passwort">
          </div>
        </div>
        <div class="field">
          <div class="control">
            <button @click="login" class="button is-link">Anmelden</button>
          </div>
        </div>
        <div v-if="error" class="notification is-danger is-light">
          {{ error }}
        </div>

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
        this.$emit('success')
      }
      else
        this.error = 'Benutzername oder Passwort ungültig'
    }
  } 
};
</script>

<style>
</style>