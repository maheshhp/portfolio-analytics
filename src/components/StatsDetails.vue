<template>
  <div class="stats-details-container">
    <h4>Detailed stats - Page Wise</h4>
    <div class="page-select-buttons-container">
      <button
        class="page-select-button"
        :class="{ 'page-select-button-selected': selectedPage === pageName }"
        v-for="(_p, pageName) in analyticsData.pageWiseVisits"
        :key="pageName"
        @click="selectedPage = pageName"
      >
        {{ pageName }}
      </button>
    </div>
    <div class="stats-table-container">
      <vue-table-lite
        :is-static-mode="true"
        :has-checkbox="false"
        :columns="tableColumns"
        :rows="getTableRows(analyticsData.pageWiseVisits, selectedPage)"
        :total="getTableRows(analyticsData.pageWiseVisits, selectedPage).length"
      />
    </div>
  </div>
</template>

<script>
import VueTableLite from "vue3-table-lite";
export default {
  data() {
    return {
      tableColumns: [
        {
          label: "Page Name",
          field: "page",
          sortable: true,
          width: "5%",
        },
        {
          label: "User Agent",
          field: "userAgent",
          sortable: true,
        },
        {
          label: "Visit Time",
          field: "visitTime",
          display: (row) =>
            `<div>Time: ${this.getParsedTime(
              row.visitTime.time
            )}</div><div>TZ: ${row.visitTime.tz || "-"}</div>`,
          width: "25%",
        },
        {
          label: "Log Time",
          field: "logTime",
          display: (row) => `<div>${this.getParsedTime(row.logTime)}</div>`,
          width: "25%",
        },
      ],
      selectedPage: "HOME", // Default page
    };
  },
  methods: {
    getTableRows(pageWiseData, pageName) {
      return pageWiseData[pageName] || [];
    },
    getParsedTime(time) {
      return time ? new Date(time).toString() : "-";
    },
  },
  components: { VueTableLite },
  props: ["analyticsData"],
  name: "StatsDetails",
};
</script>

<style scoped>
.stats-details-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0.5rem;
  border-radius: 6px;
}

.page-select-buttons-container {
  padding: 0.5rem 0;
}

.page-select-button {
  border-style: solid;
  border-radius: 6px;
  border-width: 1px;
  padding: 0.75rem 1rem;
  cursor: pointer;
  margin: 0 1rem 0 0;
}

.page-select-button-selected {
  border-color: rgb(214, 56, 71);
  color: rgb(214, 56, 71);
}

.stats-table-container {
  width: 100%;
  border-radius: 6px;
}
</style>
