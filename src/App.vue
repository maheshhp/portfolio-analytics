<template>
  <Dashboard />
</template>

<script>
import Dashboard from "./views/Dashboard.vue";

export default {
  name: "App",
  components: {
    Dashboard,
  },
};
</script>

<style>
body {
  margin: 0;
  background-color: #f8f3ef;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  color: #333;
}
</style>
