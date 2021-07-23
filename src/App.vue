<template>
  <Dashboard/>
</template>

<script>
import Dashboard from './views/Dashboard.vue'

export default {
  name: 'App',
  components: {
    Dashboard
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  padding: 1rem;
  color: #2c3e50;
}
</style>
