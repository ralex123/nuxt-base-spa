<template>
  <v-app>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <base-snackbar/>

  </v-app>
</template>


<script>
import BaseSnackbar from "../components/base/base-snackbar"

export default {
  components: {BaseSnackbar}
}
</script>

<style>

</style>
