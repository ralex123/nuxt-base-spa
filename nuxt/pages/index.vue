<template>

  <div class="grid">

    <div class="form blue-grey lighten-5 rounded-lg elevation-1 pa-6">
      <v-text-field v-model="username" label="Login"/>
      <v-text-field v-model="password" label="Password" type="password"/>
      <v-btn class="mt-4" color="primary" @click="login">Войти</v-btn>
    </div>

  </div>

</template>

<script>
export default {

  data() {
    return {
      username: '',
      password: ''
    }
  },

  methods: {

    async login() {

      this.$store.commit('baseSnackbar/show', {type: 'dev', message: 'dddd' })

      // let {data} = await this.$axios.get('/users/getIdentity',
      //   {params: {username: this.username, password: this.password}}
      // )
      //
      // if (data.status === 'success') {
      //   this.$store.commit('base-snackbar/setUserRedirect', data.data)
      // } else {
      //
      // }

    }

  }

}
</script>

<style>

.grid {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
}

.form {
  width: 350px;
  margin: auto;
}

</style>
