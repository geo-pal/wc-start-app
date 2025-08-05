<template>
  <div class="card bg-dark text-light h-100 d-flex flex-column">
    <!-- Header -->
    <div
      class="header-box bg-success text-white text-center w-100 py-2 px-3 rounded mb-3"
    >
      <h2 class="h6 m-0">Competition Stats</h2>
    </div>

    <!-- Chart Container -->
    <div class="chart-container flex-grow-1 position-relative">
      <canvas ref="chart"></canvas>
    </div>
  </div>
</template>

<script>
import { loadCSV } from "../utils/loadCSV";
import { Chart } from "chart.js/auto";

export default {
  name: "CompetitionStats",

  async mounted() {
    try {
      // Load and parse World Cup CSV data
      const data = await loadCSV("/WorldCups.csv");

      // Extract statistics from dataset
      const years = data.map((d) => d.Year);
      const goals = data.map((d) => Number(d.GoalsScored));
      const matches = data.map((d) => Number(d.MatchesPlayed));
      const teams = data.map((d) => Number(d.QualifiedTeams));

      // Create stacked bar chart
      this.renderChart(years, goals, matches, teams);
    } catch (err) {
      console.error("Failed to load CompetitionStats chart:", err);
    }
  },

  methods: {
    /**
     * Renders a stacked bar chart showing goals, matches, and qualified teams per World Cup year.
     * @param {string[]} years - Array of World Cup years.
     * @param {number[]} goals - Goals scored per tournament.
     * @param {number[]} matches - Matches played per tournament.
     * @param {number[]} teams - Number of qualified teams per tournament.
     */
    renderChart(years, goals, matches, teams) {
      new Chart(this.$refs.chart, {
        type: "bar",
        data: {
          labels: years,
          datasets: [
            {
              label: "Goals",
              data: goals,
              backgroundColor: "#fdcb6e",
              stack: "competition",
            },
            {
              label: "Matches",
              data: matches,
              backgroundColor: "#74b9ff",
              stack: "competition",
            },
            {
              label: "Teams",
              data: teams,
              backgroundColor: "#00b894",
              stack: "competition",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              labels: {
                color: "#fff", // White text for dark background
              },
            },
          },
          scales: {
            x: {
              stacked: true,
              ticks: {
                color: "#fff",
              },
            },
            y: {
              stacked: true,
              ticks: {
                color: "#fff",
              },
              title: {
                display: true,
                text: "Competition Metrics",
                color: "#fff",
              },
            },
          },
        },
      });
    },
  },
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  min-height: 300px;
  overflow: hidden;
}
</style>
