<template>
  <h4 class="highlights-heading">Highlights</h4>
  <div class="cards-container">
    <div class="card">
      <h3 class="card-heading">Total visits</h3>
      <h1 class="card-value">{{ analyticsData.visits }}</h1>
    </div>
    <div class="card">
      <h3 class="card-heading">Visits per page</h3>
      <ul class="page-visits-list">
        <li
          v-for="(pageVisits, pageName) in analyticsData.pageWiseVisits"
          :key="pageName"
        >
          <h3 class="page-visits-list-element">
            {{ pageName }} : {{ pageVisits.length }}
          </h3>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["analyticsData"],
  name: "BasicStatistics",
};
</script>

<style scoped>
.highlights-heading {
  padding: 0 0.5rem;
}

.cards-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 0.5rem;
}

.card {
  width: 230px;
  height: 100px;
  border-radius: 8px;
  background-color: white;
  padding: 1rem;
  margin: 0.5rem 1.5rem 0 0;
}

.card-heading {
  margin: 0;
}

.card-value {
  margin: 0.5rem 0;
}

.page-visits-list {
  height: 80px;
  margin: 0.5rem 0;
  overflow: auto;
  list-style-type: none;
  padding: 0;
}

.page-visits-list-element {
  margin: 0.25rem 0;
}
</style>
