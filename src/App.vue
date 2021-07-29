<template>
  <Dashboard v-if="currentUser" :currentUser="currentUser" :logout="logout" />
  <div v-else class="login-container">
    <p>Please login to view the dashboard</p>
    <p>
      <button class="login-button" @click="login()">Log In</button>
    </p>
  </div>
</template>

<script>
import Dashboard from "./views/Dashboard.vue";
import netlifyIdentity from "netlify-identity-widget";

netlifyIdentity.init({
  APIUrl: "https://analytics.hpmahesh.me/.netlify/identity",
  logo: false,
});

export default {
  name: "App",
  components: {
    Dashboard,
  },
  data: () => ({
    currentUser: null,
  }),
  methods: {
    login() {
      netlifyIdentity.open("login");
      netlifyIdentity.on("login", (user) => {
        this.currentUser = user;
        netlifyIdentity.close();
      });
    },
    logout() {
      netlifyIdentity.logout();
      netlifyIdentity.on("logout", () => {
        this.currentUser = null;
      });
    },
  },

  mounted() {
    // set user if already logged in
    this.currentUser = netlifyIdentity.currentUser();
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
.login-container {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.login-button {
  padding: 0.5rem 1rem;
  margin-left: 1rem;
}
</style>
