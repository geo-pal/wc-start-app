<template>
  <div class="card bg-dark text-light h-100 d-flex flex-column">
    <div
      class="header-box bg-success text-white text-center w-100 py-2 px-3 rounded mb-3"
    >
      <h2 class="h6 m-0">World Cup Winners</h2>
    </div>

    <div
      class="card-body p-2 flex-grow-1 d-flex align-items-center justify-content-center"
    >
      <div class="chart-container w-100 h-100 position-relative">
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
    const wins = {};

    const normalizeWinnerName = (name) => {
      if (!name) return "";
      return name
        .replace(/Germany FR/g, "Germany")
        .replace(/West Germany/g, "Germany")
        .trim();
    };

    data.forEach((d) => {
      const winner = normalizeWinnerName(d.Winner);
      if (winner && winner !== "undefined" && winner !== "") {
        wins[winner] = (wins[winner] || 0) + 1;
      }
    });

    // Sort winners by count descending
    const sortedEntries = Object.entries(wins).sort((a, b) => b[1] - a[1]);
    const labels = sortedEntries.map(([team]) => team);
    const dataValues = sortedEntries.map(([, count]) => count);

    new Chart(this.$refs.chart, {
      type: "doughnut",
      data: {
        labels,
        datasets: [
          {
            data: dataValues,
            backgroundColor: [
              "#fdcb6e",
              "#e17055",
              "#00b894",
              "#74b9ff",
              "#a29bfe",
              "#fab1a0",
              "#55efc4",
              "#ffeaa7",
              "#dfe6e9",
            ].slice(0, labels.length),
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "50%",
        plugins: {
          legend: {
            position: "right",
            labels: { color: "#fff" },
          },
        },
      },
    });
  },
};
</script>

<style scoped>
.card {
  border-radius: 10px;
}

.card-body {
  overflow: hidden;
}

.chart-container {
  width: 100%;
  height: 100%;
  position: relative;
}

canvas {
  width: 100% !important;
  height: 100% !important;
}
</style>
