<template>
  <div class="dashboard-container">
    <div class="header">
      <div class="header-action-container">
        <img
          class="profile-pic"
          src="../assets/profile-pic.jpg"
          alt="profile pic"
        />
        <h2>
          Analytics | <a href="hpmahesh.me" target="_blank">hpmahesh.me</a>
        </h2>
      </div>

      <div class="header-action-container">
        <p>Hi {{ currentUser?.user_metadata?.full_name }}</p>
        <button class="logout-button" @click="logout()">Logout</button>
      </div>
    </div>
    <BasicStatistics :analyticsData="analyticsData" />
    <StatsDetails :analyticsData="analyticsData" />
  </div>
</template>

<script>
import BasicStatistics from "../components/BasicStatistics.vue";
import StatsDetails from "../components/StatsDetails.vue";
export default {
  data() {
    return {
      analyticsData: {
        visits: "-",
        pageWiseVisits: {},
      },
    };
  },
  props: ["currentUser", "logout"],
  methods: {
    async getAnalyticsData() {
      try {
        const response = await fetch("/.netlify/functions/analyticsData", {
          headers: {
            'Authorization': `Bearer ${this.currentUser?.token?.access_token}`
          }
        });
        this.analyticsData = await response.json();
      } catch (error) {
        console.log(error);
      }
    },
  },

  mounted() {
    this.getAnalyticsData();
  },
  components: { BasicStatistics, StatsDetails },
  name: "DashboardPage",
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  width: 100%;
  flex-direction: column;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 0 1rem;
  border-bottom: 3px dashed lightgray;
}

.profile-pic {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.logout-button {
  padding: 0.5rem 1rem;
  margin-left: 1rem;
}

.header-action-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
