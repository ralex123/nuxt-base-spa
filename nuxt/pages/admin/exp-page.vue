<template>
  <div>

    <div class="x-fbsb">
      <h1>Exp page</h1>
      <div>
        <v-btn @click="$router.push('/')">back</v-btn>
        <v-btn class="ml-2" color="primary" @click="expMongo">expMongo</v-btn>
        <v-btn class="ml-2" color="primary" @click="expMongoose">expMongoose</v-btn>
      </div>
    </div>

    <div>
      <pre class="x-pre">{{exp}}</pre>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      exp: null,
    }
  },

  mounted() {

  },

  methods: {
    async expMongo() {
      let {data} = await this.$axios.get('/exp/getExpMongo')
      this.exp = data.data
    },
    async expMongoose() {
      let {data} = await this.$axios.get('/exp/getExpMongoose')
      this.exp = data.data
    },
  }
}
</script>

<style>


</style>
