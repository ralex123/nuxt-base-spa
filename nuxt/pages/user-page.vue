<template>
  <div>
    <h1>page</h1>
    <v-btn class="mt-4" color="primary" @click="$router.push('/')">back</v-btn>
    <br>
    <br>
    <code>{{ $store.state.baseAuth }}</code>
  </div>
</template>

<script>
export default {}
</script>

<style>


</style>
