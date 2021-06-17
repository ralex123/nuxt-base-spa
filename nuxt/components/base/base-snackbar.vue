<template>
  <v-snackbar v-if="type === 'info'" v-model="flagShow" :color="color" :timeout="timeout">
    <div class="base-snackbar-box-info">
      <span v-html="message"/>
      <v-btn color="white" text @click="hideSnackbar">OK</v-btn>
    </div>
  </v-snackbar>
  <v-snackbar v-else v-model="flagShow" :left="true" :color="color" :timeout="0" max-width="100%">
    <div class="base-snackbar-box-dev">
      <pre class="base-snackbar-pre" v-html="message"/>
      <v-btn color="white" text @click="hideSnackbar">OK</v-btn>
    </div>
  </v-snackbar>
</template>

<script>

// this.$store.commit('baseSnackbar/show', {type: 'dev', message: 'dddd' })

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
.base-snackbar-box-info {
  min-width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.base-snackbar-box-dev {
  min-width: 900px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.base-snackbar-pre {
  overflow-y: auto;
}
</style>
