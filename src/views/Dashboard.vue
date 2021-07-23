<template>
  <div class="header">
    <h2>Analytics | <a href="hpmahesh.me" target="_blank">hpmahesh.me</a></h2>
    <img
      class="profile-pic"
      src="../assets/profile-pic.jpg"
      alt="profile pic"
    />
  </div>
</template>

<script>
export default {
  name: "Dashboard",
};
</script>

<style scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
}

.profile-pic {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
</style>
