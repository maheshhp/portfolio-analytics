<template>
  <div class="dashboard-container">
    <div class="header">
      <h2>Analytics | <a href="hpmahesh.me" target="_blank">hpmahesh.me</a></h2>
      <img
        class="profile-pic"
        src="../assets/profile-pic.jpg"
        alt="profile pic"
      />
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

  methods: {
    async getAnalyticsData() {
      try {
        const response = await fetch("/.netlify/functions/analyticsData");
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
  name: "Dashboard",
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
}
</style>
