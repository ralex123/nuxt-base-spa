<template>

  <div class="grid">

    <div class="form blue-grey lighten-5 rounded-lg elevation-1 pa-6">
      <h3>Вход</h3>
      <v-text-field v-model="username" label="Login"/>
      <v-text-field v-model="password" label="Password" type="password"/>
      <v-btn class="mt-4" color="primary" @click="login">Войти</v-btn>
      <v-btn class="mt-4" color="primary" @click="msg">msg</v-btn>
    </div>

    <pre style="font-size: 12px; font-family: Consolas; width: 800px; overflow-y: auto">{{exp}}</pre>

  </div>

</template>

<script>
export default {

  data() {
    return {
      username: '',
      password: '',

      exp: ''
    }
  },

  methods: {

    async login() {

      ///this.$store.commit('baseSnackbar/show', {type: 'dev', message: 'dddd' })

      //let {data} = await this.$axios.get('/admin/exp/getSum', {params:{num1:1, num2:2}})
      let {data} = await this.$axios.get('/admin/users/getUsers', {params:{num1:1, num2:2}})
      this.exp = data


      // let {data} = await this.$axios.get('/users/getIdentity',
      //   {params: {username: this.username, password: this.password}}
      // )
      //
      // if (data.status === 'success') {
      //   this.$store.commit('base-snackbar/setUserRedirect', data.data)
      // } else {
      //
      // }

    },


    msg() {
      this.$store.commit('baseSnackbar/show', {type: 'info', message: 'dddd' })
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
