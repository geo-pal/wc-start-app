<template>
  <div class="card bg-dark text-light h-100 d-flex flex-column">
    <!-- Header -->
    <div
      class="header-box bg-success text-white text-center w-100 mb-3 rounded py-2 px-3"
    >
      <h2 class="h6 m-0">Qualified Countries</h2>
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
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register plugin for displaying data labels on bars
Chart.register(ChartDataLabels);

export default {
  name: "QualifiedCountriesChart",

  async mounted() {
    try {
      // Load match data from CSV
      const matches = await loadCSV("/WorldCupMatches.csv");
      const teamAppearances = {};

      // Normalize team names to avoid duplicates
      const normalizeTeamName = (name) => {
        if (!name) return "";
        return name
          .replace("Germany FR", "Germany")
          .replace("West Germany", "Germany")
          .replace('rn">', "")
          .trim();
      };

      // Track appearances of each team by year
      matches.forEach((match) => {
        const year = match["Year"];
        const homeTeam = normalizeTeamName(match["Home Team Name"]);
        const awayTeam = normalizeTeamName(match["Away Team Name"]);

        if (homeTeam) {
          teamAppearances[homeTeam] = teamAppearances[homeTeam] || new Set();
          teamAppearances[homeTeam].add(year);
        }

        if (awayTeam) {
          teamAppearances[awayTeam] = teamAppearances[awayTeam] || new Set();
          teamAppearances[awayTeam].add(year);
        }
      });

      // Convert to array and sort by number of appearances
      const sortedTeams = Object.entries(teamAppearances)
        .map(([team, yearsSet]) => [team, yearsSet.size])
        .sort((a, b) => b[1] - a[1]);

      const labels = sortedTeams.map(([team]) => team);
      const data = sortedTeams.map(([, count]) => count);

      // Adjust canvas height based on number of countries
      const barHeight = 25;
      this.$refs.chart.height = labels.length * barHeight;

      // Render horizontal bar chart
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
          indexAxis: "y", // Horizontal bars
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { display: false }, // Hide x-axis
            y: {
              ticks: {
                color: "#fff",
                autoSkip: false,
              },
            },
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => `Qualified ${context.raw} time(s)`,
              },
            },
            datalabels: {
              color: "#ccc",
              anchor: "end",
              align: "end",
              font: { size: 12 },
              formatter: (value) => value,
              clip: false,
            },
          },
        },
      });
    } catch (error) {
      console.error("Error loading QualifiedCountriesChart:", error);
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
