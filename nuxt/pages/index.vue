<template>

  <div class="grid">

    <div class="form blue-grey lighten-5 rounded-lg elevation-1 pa-6">
      <h3>Вход</h3>
      <v-text-field v-model="username" label="Login"/>
      <v-text-field v-model="password" label="Password" type="password"/>
      <v-btn class="mt-4" color="primary" @click="login">Войти</v-btn>
      <v-btn class="mt-4" color="primary" @click="msg">msg</v-btn>
      <v-btn class="mt-4" color="primary" @click="$router.push('/page')">to page</v-btn>


      <div class="mt-5">
        <code>{{$store.state.baseAuth}}</code>
      </div>
    </div>

    <pre style="font-size: 12px; font-family: Consolas; width: 800px; overflow-y: auto">{{ exp }}</pre>

  </div>

</template>

<script>
import config from "../spa.config";

export default {

  data() {
    return {
      username: '',
      password: '',
      exp: ''
    }
  },

  computed: {
    user() {
      return this.$store.state.baseAuth
    }
  },

  methods: {

    async login() {

      let {data} = await this.$axios.get('/users/login',
        {params: {username: this.username, password: this.password}}
      )

      if (data.status === 'success') {
        let user = data.data
        this.$store.commit('baseAuth/setUser', user)
        let startPage = config.roles[user.role].startPage
        await this.$router.push(startPage)
      }

    },


    msg() {
      // this.$store.commit('baseSnackbar/show', {type: 'info', message: 'dddd'})
      this.$store.commit('baseAuth/setUser', {name: 'Roror'})
    }

  }

}
</script>

<style>

.grid {
  display: flex;
  justify-content: center;
  align-items: center;
  /*height: 500px;*/
}

.form {
  width: 350px;
  margin: auto;
}

</style>
