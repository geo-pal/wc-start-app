<template>
  <div class="card bg-dark text-light h-100 d-flex flex-column">
    <!-- Card Header -->
    <div
      class="header-box bg-success text-white text-center w-100 mb-3 rounded py-2 px-3"
    >
      <h2 class="h6 m-0">Host Countries</h2>
    </div>

    <!-- Scrollable Chart Container -->
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
  name: "HostCountriesChart",

  async mounted() {
    try {
      // Load and parse CSV data
      const data = await loadCSV("/WorldCups.csv");

      // Normalize country names for consistency
      const normalizeCountry = (name) => {
        if (!name) return "";
        return name
          .replace("Germany FR", "Germany")
          .replace("West Germany", "Germany")
          .replace("Korea/Japan", "South Korea & Japan")
          .replace("USA", "United States")
          .trim();
      };

      // Count host occurrences
      const hostFrequency = {};
      data.forEach((entry) => {
        const country = normalizeCountry(entry.Country?.trim());
        if (country && country !== "undefined") {
          hostFrequency[country] = (hostFrequency[country] || 0) + 1;
        }
      });

      // Sort countries by number of times hosted (descending)
      const sortedHosts = Object.entries(hostFrequency).sort(
        (a, b) => b[1] - a[1]
      );
      const labels = sortedHosts.map(([country]) => country);
      const counts = sortedHosts.map(([, count]) => count);

      // Set canvas height dynamically based on number of host countries
      const heightPerBar = 25;
      this.$refs.chart.height = labels.length * heightPerBar;

      // Render horizontal bar chart
      new Chart(this.$refs.chart, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Times Hosted",
              data: counts,
              backgroundColor: "#74b9ff",
              barThickness: 15,
              categoryPercentage: 0.8,
              barPercentage: 0.9,
            },
          ],
        },
        options: {
          indexAxis: "y", // Horizontal bars
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              beginAtZero: true,
              ticks: {
                color: "#ffffff",
                stepSize: 1,
                precision: 0,
              },
            },
            y: {
              ticks: {
                color: "#ffffff",
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
                label: (context) => `Hosted ${context.raw} time(s)`,
              },
            },
          },
        },
      });
    } catch (error) {
      console.error("Error loading or rendering HostCountriesChart:", error);
    }
  },
};
</script>

<style scoped>
.chart-scroll-wrapper {
  max-height: 600px;
}

.chart-inner-wrapper {
  min-width: 100%;
}
</style>
