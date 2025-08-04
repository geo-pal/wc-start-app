<template>
  <div class="card bg-dark text-light h-100 d-flex flex-column">
    <div
      class="header-box bg-success text-white text-center w-100 mb-3 rounded py-2 px-3"
    >
      <h2 class="h6 m-0">Qualified Countries</h2>
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
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ChartDataLabels);

export default {
  async mounted() {
    const matches = await loadCSV("/WorldCupMatches.csv");
    const appearances = {};

    const normalizeTeamName = (name) => {
      if (!name) return "";
      return name
        .replace("Germany FR", "Germany")
        .replace("West Germany", "Germany")
        .replace('rn">', "")
        .trim();
    };

    matches.forEach((match) => {
      const year = match["Year"];
      const home = normalizeTeamName(match["Home Team Name"]);
      const away = normalizeTeamName(match["Away Team Name"]);

      if (home) {
        if (!appearances[home]) appearances[home] = new Set();
        appearances[home].add(year);
      }

      if (away) {
        if (!appearances[away]) appearances[away] = new Set();
        appearances[away].add(year);
      }
    });

    const sorted = Object.entries(appearances)
      .map(([team, yearsSet]) => [team, yearsSet.size])
      .sort((a, b) => b[1] - a[1]);

    const labels = sorted.map(([team]) => team);
    const data = sorted.map(([, count]) => count);

    const heightPerBar = 25;
    const totalHeight = labels.length * heightPerBar;
    this.$refs.chart.height = totalHeight;

    new Chart(this.$refs.chart, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: "#00b894",
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          datalabels: {
            color: "#ccc",
            anchor: "end",
            align: "end",
            formatter: (val) => val,
            font: {
              size: 12,
            },
            clip: false,
          },

          tooltip: {
            callbacks: {
              label: (context) => `Qualified ${context.raw} times`,
            },
          },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            ticks: {
              color: "#fff",
              autoSkip: false,
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
