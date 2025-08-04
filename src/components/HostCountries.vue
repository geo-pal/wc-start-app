<template>
  <div class="card bg-dark text-light h-100 d-flex flex-column">
    <div
      class="header-box bg-success text-white text-center w-100 mb-3 rounded py-2 px-3"
    >
      <h2 class="h6 m-0">Host Countries</h2>
    </div>

    <div class="chart-scroll-wrapper flex-grow-1 overflow-auto pe-2">
      <div class="chart-inner-wrapper w-100">
        <canvas ref="chart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { loadCSV } from "../utils/loadCSV";
import { Chart } from "chart.js/auto";

export default {
  async mounted() {
    const data = await loadCSV("/WorldCups.csv");

    // Normalize and merge host countries
    const normalize = (name) => {
      if (!name) return "";
      return name
        .replace("Germany FR", "Germany")
        .replace("West Germany", "Germany")
        .replace("Korea/Japan", "South Korea & Japan")
        .replace("USA", "United States")
        .trim();
    };

    const hostCounts = {};
    data.forEach((d) => {
      const country = normalize(d.Country?.trim());
      if (country && country !== "undefined") {
        hostCounts[country] = (hostCounts[country] || 0) + 1;
      }
    });

    const sorted = Object.entries(hostCounts).sort((a, b) => b[1] - a[1]);
    const labels = sorted.map(([country]) => country);
    const values = sorted.map(([, count]) => count);

    const heightPerBar = 25;
    const totalHeight = labels.length * heightPerBar;
    this.$refs.chart.height = totalHeight;

    new Chart(this.$refs.chart, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Times Hosted",
            data: values,
            backgroundColor: "#74b9ff",
            barThickness: 15,
            categoryPercentage: 0.8,
            barPercentage: 0.9,
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              color: "#fff",
              stepSize: 1,
              precision: 0,
            },
          },
          y: {
            ticks: {
              color: "#fff",
              autoSkip: false,
              maxRotation: 0,
              minRotation: 0,
            },
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context) => `Hosted ${context.raw} times`,
            },
          },
        },
      },
    });
  },
};
</script>

<style scoped>
.chart-scroll-wrapper {
  max-height: 600px;
}

.chart-inner-wrapper {
  min-height: auto;
  min-width: 100%;
}
</style>
