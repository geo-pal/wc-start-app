<template>
  <div class="card bg-dark text-light h-100 d-flex flex-column">
    <div
      class="header-box bg-success text-white text-center w-100 py-2 px-3 rounded mb-3"
    >
      <h2 class="h6 m-0">Competition Stats</h2>
    </div>

    <div class="chart-container flex-grow-1 position-relative">
      <canvas ref="chart"></canvas>
    </div>
  </div>
</template>

<script>
import { loadCSV } from "../utils/loadCSV";
import { Chart } from "chart.js/auto";

export default {
  async mounted() {
    const data = await loadCSV("/WorldCups.csv");

    const years = data.map((d) => d.Year);
    const goals = data.map((d) => +d.GoalsScored);
    const matches = data.map((d) => +d.MatchesPlayed);
    const teams = data.map((d) => +d.QualifiedTeams);

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
              color: "#fff",
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
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  min-height: 300px;
}
</style>
