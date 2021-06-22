<template>
  <div>
    <div class="x-fbsb">
      <h1>Управление пользователями</h1>
      <div>
        <v-btn class="mr-4" @click="$router.push('/')">back</v-btn>
        <v-btn color="primary" @click="addUser">Добавить</v-btn>
      </div>
    </div>
    <div>
      <table class="x-table x-table-stripped x-table-hover mt-3">
        <tr v-for="user in users" @click="rowEdit(user)">
          <td>{{ user.id }}</td>
          <td>{{ user.login }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.role }}</td>
          <td>{{ user.flag_block }}</td>
        </tr>
      </table>
    </div>

    <v-dialog v-model="dialog" width="500" persistent>
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Редактировать
        </v-card-title>

        <v-card-text class="mt-4">

          <v-text-field label="login" v-model="curUser.login"/>
          <v-text-field label="password" v-model="curUser.password"/>
          <v-text-field label="name" v-model="curUser.name"/>
          <v-text-field label="role" v-model="curUser.role"/>
          <v-text-field label="flag_block" v-model="curUser.flag_block"/>

        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div>
            <v-btn color="error" text @click="dialog=false; curUser = {}">Отмена</v-btn>
            <v-btn color="primary" text @click="saveUser(curUser)">Сохранить</v-btn>
          </div>
        </v-card-actions>
      </v-card>

    </v-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      dialog: false,
      curUser: {}
    }
  },

  mounted() {
    this.getUsers()
  },

  methods: {
    async getUsers() {
      let {data} = await this.$axios.get('/users/getUserList')
      this.users = data.data
    },

    rowEdit(item) {
      this.curUser = Object.assign({}, item)
      this.dialog = true
    },

    addUser() {
      this.dialog = true
    },

    async saveUser(user) {

      let {data} = await this.$axios.post('/users/cudUser', [
        user.id, user.login, user.name, user.role, user.flag_block, user.password
      ])

      if (data.status === 'success') {
        await this.getUsers()
        this.curUser = {}
        this.dialog = false
      }

    }


  }
}
</script>

<style>


</style>
