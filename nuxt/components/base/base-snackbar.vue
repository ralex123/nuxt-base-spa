<template>
  <div>
    <v-snackbar v-model="flagShow" :left="type === 'dev'" :color="color" :timeout="timeout">
      <div class="base-snackbar-box">
        <span v-html="message"/>
        <v-btn color="white" text @click="hideSnackbar">OK</v-btn>
      </div>
    </v-snackbar>
  </div>
</template>

<script>
import config from "../../app.config";

export default {
  name: 'base-snackbar',
  computed: {
    flagShow: {
      get() {
        return this.$store.state.baseSnackbar.flagShow
      },
      set(value) {
        this.$store.commit('baseSnackbar/hide')
      }
    },
    message() {
      return this.$store.state.baseSnackbar.message
    },
    type() {
      return this.$store.state.baseSnackbar.type
    },
    color() {
      if (this.$store.state.baseSnackbar.type === 'info') {
        return config.baseSnackbar.infoColor
      } else {
        return config.baseSnackbar.devColor
      }
    },
    timeout() {
      return config.baseSnackbar.timeout
    }
  },
  methods: {
    hideSnackbar() {
      this.$store.commit('baseSnackbar/hide')
    },
  }
}
</script>

<style scoped>
.base-snackbar-box {
  min-width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
